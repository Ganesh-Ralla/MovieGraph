from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

from neo4j.exceptions import Neo4jError, ServiceUnavailable


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, (Neo4jError, ServiceUnavailable)):
        return Response(
            {
                "error": "Movie database is currently unavailable."
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return response