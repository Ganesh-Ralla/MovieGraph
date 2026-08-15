import json
import os

from .db import driver

# TMDB's genre IDs are fixed and public.
TMDB_GENRE_NAMES = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
}


def seed_from_json():
    json_path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    movies = data["results"]
    print(f"Found {len(movies)} movies in data.json")

    with driver.session() as session:
        # Clear old data first so re-running this doesn't leave stale nodes
        session.run("MATCH (n) DETACH DELETE n")
        print("Existing graph cleared.")

        for movie in movies:
            year = None
            if movie.get("release_date"):
                year = int(movie["release_date"][:4])

            session.run("""
                MERGE (m:Movie {id: $id})
                SET m.title = $title,
                    m.year = $year,
                    m.rating = $rating,
                    m.description = $description,
                    m.poster_path = $poster_path
            """,
                id=str(movie["id"]),
                title=movie.get("title", ""),
                year=year,
                rating=movie.get("vote_average", 0),
                description=movie.get("overview", ""),
                poster_path=movie.get("poster_path", ""),
            )

            for genre_id in movie.get("genre_ids", []):
                genre_name = TMDB_GENRE_NAMES.get(genre_id, f"Unknown ({genre_id})")
                session.run("""
                    MERGE (g:Genre {id: $gid})
                    SET g.name = $name
                    WITH g
                    MATCH (m:Movie {id: $mid})
                    MERGE (m)-[:IN_GENRE]->(g)
                """,
                    gid=str(genre_id),
                    name=genre_name,
                    mid=str(movie["id"]),
                )

            print(f"  loaded: {movie.get('title')}")

    print("Database seeding completed successfully.")