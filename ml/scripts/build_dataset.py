import pandas as pd
from dotenv import load_dotenv

load_dotenv()


from src.data.tmdb_collector import (
    collect_and_normalize_movies,
    collect_and_normalize_tv,
    collect_and_normalize_anime
)


def build_dataset():
    print("Collecting movies...")
    movies = collect_and_normalize_movies(15)

    print("Collecting TV shows...")
    tv_shows = collect_and_normalize_tv(15)

    print("Collecting anime...")
    anime_shows = collect_and_normalize_anime(15)

    all_content = movies + tv_shows + anime_shows

    df = pd.DataFrame(all_content)

    # Remove duplicate content IDs.
    # Anime gets priority over generic TV.
    df["type_priority"] = df["type"].map({
        "anime": 0,
        "tv": 1,
        "movie": 2
    })

    df = (
        df.sort_values("type_priority")
        .drop_duplicates(subset=["content_id"], keep="first")
        .drop(columns=["type_priority"])
        .reset_index(drop=True)
    )

    # Replace missing text fields with empty strings.
    text_columns = ["title", "overview", "genres", "cast"]
    df[text_columns] = df[text_columns].fillna("")

    output_path = "data/raw/content.csv"
    df.to_csv(output_path, index=False)
    print(f"\nDataset saved to: {output_path}")

    print(f"\nTotal records: {len(df)}")
    print("\nContent distribution:")
    print(df["type"].value_counts())

    return df


if __name__ == "__main__":
    build_dataset()