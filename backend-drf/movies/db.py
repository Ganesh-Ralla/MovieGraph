from neo4j import GraphDatabase
from django.conf import settings


driver = GraphDatabase.driver(
    settings.COGNODB_URI,
    auth=(
        settings.COGNODB_USERNAME,
        settings.COGNODB_PASSWORD,
    ),
)


def create_constraints():
    constraints = [
        """
        CREATE CONSTRAINT movie_id_unique IF NOT EXISTS
        FOR (m:Movie)
        REQUIRE m.id IS UNIQUE
        """,

        """
        CREATE CONSTRAINT actor_id_unique IF NOT EXISTS
        FOR (a:Actor)
        REQUIRE a.id IS UNIQUE
        """,

        """
        CREATE CONSTRAINT director_id_unique IF NOT EXISTS
        FOR (d:Director)
        REQUIRE d.id IS UNIQUE
        """,

        """
        CREATE CONSTRAINT genre_id_unique IF NOT EXISTS
        FOR (g:Genre)
        REQUIRE g.id IS UNIQUE
        """,
    ]

    with driver.session() as session:
        for query in constraints:
            session.run(query)

    print("Constraints created successfully.")