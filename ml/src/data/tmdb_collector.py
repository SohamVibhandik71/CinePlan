import os
import requests
import time
from dotenv import load_dotenv

load_dotenv()

TMDB_BASE_URL = "https://api.themoviedb.org/3"


session = requests.Session()


#instead of directly calling the get function to request use tmdb_get which has retry mechanism for failed request
def tmdb_get(url, headers, params=None, retries=5):
    for attempt in range(retries):
        try:
            response = session.get(
                url,
                headers=headers,
                params=params,
                timeout=30
            )

            response.raise_for_status()
            return response

        except requests.exceptions.RequestException:
            if attempt == retries - 1:
                raise

            wait_time = 2 ** attempt

            print(
                f"Request failed. "
                f"Retrying in {wait_time}s "
                f"({attempt + 1}/{retries})..."
            )

            time.sleep(wait_time)

# Function to get movies from TMDB API at perticular page
def get_movies(page=1):
    url = f"{TMDB_BASE_URL}/discover/movie"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    params = {
        "page": page,
        "include_adult": False,
        "sort_by": "popularity.desc"
    }

    response = tmdb_get(
        url,
        headers=headers,
        params=params
    )


    return response.json()


# to collect movies from multiple pages
def collect_movies(num_pages=3):
    all_movies = []

    for page in range(1, num_pages + 1):
        data = get_movies(page)
        all_movies.extend(data["results"])

    return all_movies


#getting movie details from TMDB API for a particular movie id
def get_movie_details(movie_id):
    url = f"{TMDB_BASE_URL}/movie/{movie_id}"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    params = {
        "append_to_response": "credits"
    }

    response = tmdb_get(
        url,
        headers=headers,
        params=params
    )


    return response.json()


# Normalizing the movie details to a consistent format for storage or further processing
def normalize_movie(details):
    genres = "|".join(
        genre["name"]
        for genre in details.get("genres", [])
    )

    cast = "|".join(
        actor["name"]
        for actor in details.get("credits", {}).get("cast", [])[:10]
    )

    return {
        "content_id": details["id"],
        "title": details["title"],
        "type": "movie",
        "overview": details.get("overview", ""),
        "genres": genres,
        "cast": cast,
        "language": details.get("original_language", ""),
        "rating": details.get("vote_average", 0),
        "popularity": details.get("popularity", 0),
        "release_date": details.get("release_date", "")
    }

# Collecting and normalizing movies from TMDB API
def collect_and_normalize_movies(num_pages=1):
    normalized_movies = []

    for page in range(1, num_pages + 1):
        movies = get_movies(page)

        for movie in movies["results"]:
            details = get_movie_details(movie["id"])
            normalized_movies.append(normalize_movie(details))

    return normalized_movies

# Function to get TV shows from TMDB API at a particular page
def get_tv(page=1):
    url = f"{TMDB_BASE_URL}/discover/tv"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    params = {
        "page": page,
        "include_adult": False,
        "sort_by": "popularity.desc"
    }

    response = tmdb_get(
        url,
        headers=headers,
        params=params
    )


    return response.json()


# Function to collect perticular TV shows details
def get_tv_details(tv_id):
    url = f"{TMDB_BASE_URL}/tv/{tv_id}"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    response = tmdb_get(
        url,
        headers=headers
    )


    details = response.json()

    credits_response = tmdb_get(
        f"{url}/credits",
        headers=headers
    )


    details["credits"] = credits_response.json()

    return details



def normalize_tv(details):
    genres = "|".join(
        genre["name"]
        for genre in details.get("genres", [])
    )

    cast = "|".join(
        actor["name"]
        for actor in details.get("credits", {}).get("cast", [])[:10]
    )

    return {
        "content_id": details["id"],
        "title": details["name"],
        "type": "tv",
        "overview": details.get("overview", ""),
        "genres": genres,
        "cast": cast,
        "language": details.get("original_language", ""),
        "rating": details.get("vote_average", 0),
        "popularity": details.get("popularity", 0),
        "release_date": details.get("first_air_date", "")
    }


def collect_and_normalize_tv(num_pages=1):
    normalized_tv = []

    for page in range(1, num_pages + 1):
        tv_shows = get_tv(page)

        for tv in tv_shows["results"]:
            details = get_tv_details(tv["id"])
            normalized_tv.append(normalize_tv(details))

    return normalized_tv



def get_anime(page=1):
    url = f"{TMDB_BASE_URL}/discover/tv"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    params = {
        "page": page,
        "with_genres": 16,
        "with_origin_country": "JP",
        "include_adult": False,
        "sort_by": "popularity.desc"
    }

    response = tmdb_get(
        url,
        headers=headers,
        params=params
    )


    return response.json()


def get_anime_details(anime_id):
    url = f"{TMDB_BASE_URL}/tv/{anime_id}"

    headers = {
        "Authorization": f"Bearer {os.getenv('TMDB_ACCESS_TOKEN')}"
    }

    response = tmdb_get(
        url,
        headers=headers
    )


    details = response.json()

    credits_response = tmdb_get(
        f"{url}/credits",
        headers=headers
    )


    details["credits"] = credits_response.json()

    return details


def normalize_anime(details):
    genres = "|".join(
        genre["name"]
        for genre in details.get("genres", [])
    )

    cast = "|".join(
        actor["name"]
        for actor in details.get("credits", {}).get("cast", [])[:10]
    )

    return {
        "content_id": details["id"],
        "title": details["name"],
        "type": "anime",
        "overview": details.get("overview", ""),
        "genres": genres,
        "cast": cast,
        "language": details.get("original_language", ""),
        "rating": details.get("vote_average", 0),
        "popularity": details.get("popularity", 0),
        "release_date": details.get("first_air_date", "")
    }

def collect_and_normalize_anime(num_pages=1):
    normalized_anime = []

    for page in range(1, num_pages + 1):
        anime_shows = get_anime(page)

        for anime in anime_shows["results"]:
            details = get_anime_details(anime["id"])
            normalized_anime.append(normalize_anime(details))

    return normalized_anime
