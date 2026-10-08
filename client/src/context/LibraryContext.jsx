import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import axios from "axios";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const { token, isAuthenticated } = useAuth();

    const [library, setLibrary] = useState([]);
    const [libraryLoading, setLibraryLoading] = useState(false);
    const [libraryError, setLibraryError] = useState(null);

    // =====================================================
    // FETCH LIBRARY
    // =====================================================

    const fetchLibrary = async () => {
        if (!token) {
            setLibrary([]);
            return;
        }

        try {
            setLibraryLoading(true);
            setLibraryError(null);

            // Get user's library from MongoDB
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/library`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.data.success) {
                setLibraryError(
                    response.data.message || "Failed to fetch library"
                );
                return;
            }

            const libraryItems = response.data.data || [];

            // Fetch TMDB details for every library item
            const detailedLibrary = await Promise.all(
                libraryItems.map(async (item) => {
                    try {
                        let endpoint;

                        if (item.type === "movie") {
                            endpoint = `/api/content/movie/${item.externalId}`;
                        } else if (item.type === "tv") {
                            endpoint = `/api/content/tv/${item.externalId}`;
                        } else {
                            // Anime handling will be added separately
                            return {
                                ...item,
                                name: item.title,
                                id: item.externalId
                            };
                        }

                        const detailsResponse = await axios.get(
                            `${import.meta.env.VITE_BASE_URL}${endpoint}`
                        );

                        const tmdbData = detailsResponse.data.data;

                        return {
                            ...tmdbData,

                            // MongoDB data
                            _id: item._id,
                            externalId: item.externalId,
                            status: item.status,
                            priority: item.priority,
                            progress: item.progress,
                            completedAt: item.completedAt,
                            addedAt: item.addedAt,
                            genres: item.genres,

                            // Keep database title
                            libraryTitle: item.title
                        };

                    } catch (error) {
                        console.error(
                            `Failed to fetch details for ${item.title}:`,
                            error
                        );

                        // Keep the library item even if TMDB fails
                        return {
                            ...item,
                            name: item.title,
                            id: item.externalId
                        };
                    }
                })
            );

            setLibrary(detailedLibrary);

        } catch (error) {
            console.error("Error fetching library:", error);

            setLibraryError(
                error.response?.data?.message ||
                "Failed to fetch library"
            );
        } finally {
            setLibraryLoading(false);
        }
    };

    // =====================================================
    // ADD TO LIBRARY
    // =====================================================

    const addToLibrary = async (movie) => {
        if (!token) {
            throw new Error("Please login to add items to your library");
        }

        try {
            const libraryData = {
                externalId: movie.externalId || movie.id,
                title: movie.title || movie.name,
                type: movie.type,
                poster: movie.poster || null,
                genres: movie.genres || [],
                priority: movie.priority || "medium"
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/library`,
                libraryData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message || "Failed to add to library"
                );
            }

            const newLibraryItem = response.data.data;

            // Add the new item to the existing library state.
            // We keep MongoDB data here; TMDB details will be
            // fetched when fetchLibrary() runs again.
            setLibrary((prev) => [
                ...prev,
                {
                    ...newLibraryItem,
                    name: newLibraryItem.title,
                    id: newLibraryItem.externalId
                }
            ]);

            return newLibraryItem;

        } catch (error) {
            console.error("Error adding to library:", error);

            throw error;
        }
    };

    const updateLibraryItem = async (libraryId, updates) => {
    if (!token) {
        throw new Error("Please login to update your library");
    }

    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/api/library/${libraryId}`,
            updates,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to update library item"
            );
        }

        const updatedItem = response.data.data;

        setLibrary((prev) =>
            prev.map((item) =>
                item._id === libraryId
                    ? {
                        ...item,
                        ...updatedItem
                    }
                    : item
            )
        );

        return updatedItem;

        } catch (error) {
            console.error("Error updating library item:", error);
            throw error;
        }
    };

    const deleteLibraryItem = async (libraryId) => {
        if (!token) {
            throw new Error("Please login to remove items from your library");
        }

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/library/${libraryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message || "Failed to remove library item"
                );
            }

            // Immediately remove from centralized state
            setLibrary((prev) =>
                prev.filter((item) => item._id !== libraryId)
            );

            return response.data;

        } catch (error) {
            console.error("Error removing library item:", error);
            throw error;
        }
    };

    // =====================================================
    // FETCH WHEN USER LOGS IN
    // =====================================================

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchLibrary();
        } else {
            setLibrary([]);
        }
    }, [isAuthenticated, token]);

    return (
        <LibraryContext.Provider
            value={{
                library,
                libraryLoading,
                libraryError,
                fetchLibrary,
                addToLibrary,
                updateLibraryItem,
                deleteLibraryItem,
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    return useContext(LibraryContext);
};