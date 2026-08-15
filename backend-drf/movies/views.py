from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from neo4j.exceptions import Neo4jError

from . import services


def node_to_dict(node):
    """Neo4j Node objects aren't JSON-serialisable directly."""
    return dict(node) if node is not None else None


def nodes_to_list(nodes):
    return [dict(n) for n in nodes]


class MovieListView(APIView):
    def get(self, request):
        try:
            movies = services.get_all_movies()

        except Neo4jError:
            return Response(
                {"error": "Database temporarily unreachable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response({
            "results": nodes_to_list(movies)
        })


class MovieDetailView(APIView):
    def get(self, request, movie_id):
        data = services.get_movie_details(movie_id)

        if data is None:
            return Response(
                {"error": "Movie not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({
            "movie": node_to_dict(data["movie"]),
            "genres": nodes_to_list(data["genres"]),
        })


class MovieSearchView(APIView):
    def get(self, request):
        q = request.query_params.get("q", "").strip()

        if not q:
            return Response({
                "results": []
            })

        movies = services.search_movies(q)

        return Response({
            "results": nodes_to_list(movies)
        })


class MovieRecommendationsView(APIView):
    def get(self, request, movie_id):
        results = services.get_movie_recommendations(movie_id)

        if results is None:
            return Response(
                {"error": "Movie not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({
            "results": results
        })