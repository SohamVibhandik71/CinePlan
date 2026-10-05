import os
import pickle
import numpy as np
import pandas as pd

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler


class Recommender:

    def __init__(self):
        base_dir = os.path.dirname(
            os.path.dirname(
                os.path.dirname(os.path.abspath(__file__))
            )
        )

        models_dir = os.path.join(base_dir, "models")

        with open(
            os.path.join(models_dir, "tfidf_vectorizer.pkl"), "rb"
        ) as f:
            self.vectorizer = pickle.load(f)

        with open(
            os.path.join(models_dir, "tfidf_matrix.pkl"), "rb"
        ) as f:
            self.tfidf_matrix = pickle.load(f)

        with open(
            os.path.join(models_dir, "content_data.pkl"), "rb"
        ) as f:
            self.df = pickle.load(f)

        print("Recommendation model loaded successfully.")

    def recommend(self, user_history, top_n=10):

        # Work on a copy so the original dataset remains unchanged
        df = self.df.copy()

        # Find dataset indices for user's history
        history_indices = []

        for content_id in user_history:

            matches = df.index[
                df["content_id"] == content_id
            ].tolist()

            if matches:
                history_indices.append(matches[0])

        # No history → no recommendations for now
        if not history_indices:
            return []

        # --------------------------------------------------
        # 1. Build user profile from history
        # --------------------------------------------------

        user_profile = np.asarray(
            self.tfidf_matrix[history_indices].mean(axis=0)
        )

        # --------------------------------------------------
        # 2. Calculate TF-IDF similarity
        # --------------------------------------------------

        tfidf_scores = cosine_similarity(
            user_profile,
            self.tfidf_matrix
        ).flatten()

        df["tfidf_score"] = tfidf_scores

        # Normalize TF-IDF scores
        df["tfidf_normalized"] = MinMaxScaler().fit_transform(
            df[["tfidf_score"]]
        ).flatten()

        # --------------------------------------------------
        # 3. Calculate genre preferences
        # --------------------------------------------------

        user_genres = []

        for index in history_indices:

            user_genres.extend(
                str(df.loc[index, "genres"]).split("|")
            )

        genre_counts = pd.Series(
            user_genres
        ).value_counts()

        total_genres = genre_counts.sum()

        genre_preferences = (
            genre_counts / total_genres
        ).to_dict()

        # Calculate genre score for every content
        def genre_score(genres):

            return sum(
                genre_preferences.get(genre, 0)
                for genre in set(str(genres).split("|"))
            )

        df["genre_score"] = df["genres"].apply(
            genre_score
        )

        # Normalize genre scores
        df["genre_normalized"] = MinMaxScaler().fit_transform(
            df[["genre_score"]]
        ).flatten()

        # --------------------------------------------------
        # 4. Calculate content-type preferences
        # --------------------------------------------------

        type_counts = df.loc[
            history_indices,
            "type"
        ].value_counts()

        type_preferences = (
            type_counts / len(history_indices)
        ).to_dict()

        df["type_score"] = df["type"].apply(
            lambda content_type:
                type_preferences.get(content_type, 0)
        )

        # --------------------------------------------------
        # 5. Calculate hybrid recommendation score
        # --------------------------------------------------

        df["final_score"] = (
            0.20 * df["tfidf_normalized"] +
            0.40 * df["genre_normalized"] +
            0.40 * df["type_score"]
        )

        # --------------------------------------------------
        # 6. Remove content already in user's history
        # --------------------------------------------------

        recommendations = df.drop(
            index=history_indices
        ).copy()

        # Sort by recommendation score
        recommendations = recommendations.sort_values(
            "final_score",
            ascending=False
        )

        # --------------------------------------------------
        # 7. Apply diversity
        # --------------------------------------------------

        diverse_recommendations = []

        type_counts = {
            "movie": 0,
            "tv": 0,
            "anime": 0
        }

        max_per_type = 5

        for _, row in recommendations.iterrows():

            content_type = row["type"]

            # Skip if this content type already reached the limit
            if type_counts.get(
                content_type, 0
            ) >= max_per_type:
                continue

            diverse_recommendations.append({
                "content_id": row["content_id"],
                "title": row["title"],
                "type": row["type"],
                "genres": row["genres"],
                "final_score": round(
                    float(row["final_score"]),
                    3
                )
            })

            type_counts[content_type] += 1

            # Stop when we have enough recommendations
            if len(diverse_recommendations) == top_n:
                break

        # --------------------------------------------------
        # 8. Return recommendations
        # --------------------------------------------------

        return diverse_recommendations