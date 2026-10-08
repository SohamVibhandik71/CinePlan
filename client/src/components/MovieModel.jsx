import React from "react";
import { useNavigate } from "react-router-dom";
import {
    X,
    Check,
    Play,
    Plus,
    Trash2
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";

const MovieModal = ({ movie, onClose }) => {
    const { isAuthenticated } = useAuth();

    const {
        library,
        addToLibrary,
        updateLibraryItem,
        deleteLibraryItem
    } = useLibrary();

    const navigate = useNavigate();

    if (!movie) return null;

    const {
        name,
        title,
        type,
        poster,
        rating,
        overview,
        releaseDate,
        popularity,
        description
    } = movie;

    // =====================================================
    // FIND MOVIE IN LIBRARY
    // =====================================================

    const movieId = movie.externalId || movie.id;

    const libraryItem = library.find(
        (item) =>
            item.externalId === movieId &&
            item.type === type
    );

    // =====================================================
    // ADD TO WATCHLIST
    // =====================================================

    const handleAddToWatchlist = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            await addToLibrary(movie);
        } catch (error) {
            console.error(
                "Error adding to watchlist:",
                error
            );
        }
    };

    // =====================================================
    // START WATCHING
    // =====================================================

    const handleStartWatching = async () => {
        if (!libraryItem) return;

        try {
            await updateLibraryItem(
                libraryItem._id,
                {
                    status: "watching"
                }
            );
        } catch (error) {
            console.error(
                "Error starting content:",
                error
            );
        }
    };

    // =====================================================
    // MARK COMPLETED
    // =====================================================

    const handleMarkCompleted = async () => {
        if (!libraryItem) return;

        try {
            await updateLibraryItem(
                libraryItem._id,
                {
                    status: "completed",
                    progress: 100
                }
            );
        } catch (error) {
            console.error(
                "Error completing content:",
                error
            );
        }
    };

    // =====================================================
    // REMOVE FROM LIBRARY
    // =====================================================

    const handleRemoveFromLibrary = async () => {
        if (!libraryItem) return;

        try {
            await deleteLibraryItem(
                libraryItem._id
            );

            onClose();

        } catch (error) {
            console.error(
                "Error removing from library:",
                error
            );
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/80
                backdrop-blur-sm
                px-4
            "
            onClick={onClose}
        >

            <div
                className="
                    relative
                    w-full max-w-3xl
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-2xl
                    border border-white/10
                    bg-[#111]
                    shadow-2xl
                "
                onClick={(e) => e.stopPropagation()}
            >

                {/* =================================================
                    CLOSE BUTTON
                ================================================= */}

                <button
                    onClick={onClose}
                    className="
                        absolute right-4 top-4 z-10
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-black/60
                        text-gray-300
                        transition
                        hover:bg-white/10
                        hover:text-white
                    "
                >
                    <X size={20} />
                </button>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="flex flex-col gap-6 p-6 md:flex-row">

                    {/* =================================================
                        POSTER
                    ================================================= */}

                    <div className="w-full shrink-0 md:w-[220px]">

                        {poster ? (
                            <img
                                src={poster}
                                alt={name || title}
                                className="
                                    w-full
                                    rounded-xl
                                    object-cover
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    aspect-[2/3]
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white/5
                                    text-gray-600
                                "
                            >
                                No Image
                            </div>
                        )}

                    </div>

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="flex flex-1 flex-col">

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-white
                                md:text-3xl
                            "
                        >
                            {name || title}
                        </h2>

                        {/* META */}

                        <div
                            className="
                                mt-3
                                flex
                                flex-wrap
                                gap-3
                                text-sm
                                text-gray-400
                            "
                        >

                            {rating !== undefined && (
                                <span>
                                    ⭐{" "}
                                    {Number(rating).toFixed(1)}
                                </span>
                            )}

                            {releaseDate && (
                                <span>
                                    {releaseDate}
                                </span>
                            )}

                            {popularity !== undefined && (
                                <span>
                                    Popularity:{" "}
                                    {Number(popularity).toFixed(0)}
                                </span>
                            )}

                        </div>

                        {/* OVERVIEW */}

                        <p
                            className="
                                mt-5
                                leading-relaxed
                                text-gray-400
                            "
                        >
                            {overview ||
                                description ||
                                "No description available."}
                        </p>

                        {/* =================================================
                            LIBRARY ACTIONS
                        ================================================= */}

                        <div className="mt-7">

                            {/* =============================================
                                NOT IN LIBRARY
                            ============================================= */}

                            {!libraryItem && (
                                <button
                                    onClick={handleAddToWatchlist}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-[#d4af37]
                                        px-5 py-3
                                        text-sm
                                        font-semibold
                                        text-black
                                        transition
                                        hover:bg-[#e4c65a]
                                    "
                                >
                                    <Plus size={18} />

                                    Add to Watchlist
                                </button>
                            )}

                            {/* =============================================
                                PLANNED
                            ============================================= */}

                            {libraryItem?.status === "planned" && (
                                <div className="flex flex-wrap gap-3">

                                    <button
                                        onClick={
                                            handleStartWatching
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            bg-[#d4af37]
                                            px-5 py-3
                                            text-sm
                                            font-semibold
                                            text-black
                                            transition
                                            hover:bg-[#e4c65a]
                                        "
                                    >
                                        <Play size={18} />

                                        Start Watching
                                    </button>

                                    <span
                                        className="
                                            flex
                                            items-center
                                            rounded-lg
                                            border
                                            border-white/10
                                            px-4 py-3
                                            text-sm
                                            text-gray-400
                                        "
                                    >
                                        Planned
                                    </span>

                                </div>
                            )}

                            {/* =============================================
                                WATCHING
                            ============================================= */}

                            {libraryItem?.status === "watching" && (
                                <div className="flex flex-wrap gap-3">

                                    <button
                                        onClick={
                                            handleMarkCompleted
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            bg-green-500
                                            px-5 py-3
                                            text-sm
                                            font-semibold
                                            text-black
                                            transition
                                            hover:bg-green-400
                                        "
                                    >
                                        <Check size={18} />

                                        Mark Completed
                                    </button>

                                    <span
                                        className="
                                            flex
                                            items-center
                                            rounded-lg
                                            border
                                            border-[#d4af37]/30
                                            bg-[#d4af37]/10
                                            px-4 py-3
                                            text-sm
                                            text-[#f2ca50]
                                        "
                                    >
                                        Watching
                                    </span>

                                </div>
                            )}

                            {/* =============================================
                                COMPLETED
                            ============================================= */}

                            {libraryItem?.status === "completed" && (
                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-green-500/30
                                        bg-green-500/10
                                        px-5 py-3
                                        text-sm
                                        font-semibold
                                        text-green-400
                                    "
                                >
                                    <Check size={18} />

                                    Completed
                                </div>
                            )}

                            {/* =============================================
                                REMOVE FROM LIBRARY
                            ============================================= */}

                            {libraryItem && (
                                <button
                                    onClick={
                                        handleRemoveFromLibrary
                                    }
                                    className="
                                        mt-4
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-red-500/30
                                        bg-red-500/10
                                        px-5 py-3
                                        text-sm
                                        font-medium
                                        text-red-400
                                        transition
                                        hover:border-red-500/50
                                        hover:bg-red-500/20
                                        hover:text-red-300
                                    "
                                >
                                    <Trash2 size={17} />

                                    Remove from Library
                                </button>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;