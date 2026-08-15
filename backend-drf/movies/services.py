from .db import driver
from neo4j.exceptions import Neo4jError

from .queries import (
    GET_ALL_MOVIES,
    GET_MOVIE_BY_ID,
    SEARCH_MOVIES,
    GET_MOVIE_DETAILS,
    GET_MOVIE_RECOMMENDATIONS,
)


def get_all_movies():
    try:
        with driver.session() as session:
            result = session.run(GET_ALL_MOVIES)
            return [record["m"] for record in result]

    except Neo4jError as e:
        print("CognoDB error:", e)
        raise


def get_movie_by_id(movie_id):
    with driver.session() as session:
        result = session.run(
            GET_MOVIE_BY_ID,
            movie_id=movie_id
        )

        record = result.single()

        if not record:
            return None

        return record["m"]


def search_movies(search):
    with driver.session() as session:
        result = session.run(
            SEARCH_MOVIES,
            search=search
        )

        return [record["m"] for record in result]


def get_movie_details(movie_id):
    with driver.session() as session:
        result = session.run(
            GET_MOVIE_DETAILS,
            movie_id=movie_id
        )

        record = result.single()

        if not record:
            return None

        return {
            "movie": record["m"],
            "genres": record["genres"],
        }


def get_movie_recommendations(movie_id):
    with driver.session() as session:

        # Make sure the movie exists
        movie_result = session.run(
            """
            MATCH (m:Movie {id: $movie_id})
            RETURN m
            """,
            movie_id=movie_id
        )

        if not movie_result.single():
            return None

        result = session.run(
            GET_MOVIE_RECOMMENDATIONS,
            movie_id=movie_id
        )

        return [
            {
                "id": record["id"],
                "title": record["title"],
                "year": record["year"],
                "rating": record["rating"],
                "description": record["description"],
                "poster_path": record["poster_path"],
                "recommendation_score": record["recommendation_score"],
            }
            for record in result
        ]