GET_ALL_MOVIES = """
MATCH (m:Movie)
RETURN m
ORDER BY m.title
"""


GET_MOVIE_BY_ID = """
MATCH (m:Movie {id: $movie_id})
RETURN m
"""


SEARCH_MOVIES = """
MATCH (m:Movie)
WHERE toLower(m.title) CONTAINS toLower($search)
RETURN m
ORDER BY m.title
"""


GET_MOVIE_DETAILS = """
MATCH (m:Movie {id: $movie_id})
OPTIONAL MATCH (m)-[:IN_GENRE]->(g:Genre)

RETURN
    m,
    collect(DISTINCT g) AS genres
"""


GET_MOVIE_RECOMMENDATIONS = """
MATCH (m:Movie {id: $movie_id})-[:IN_GENRE]->(g:Genre)
MATCH (recommended:Movie)-[:IN_GENRE]->(g)

WHERE recommended.id <> m.id

WITH recommended, COUNT(DISTINCT g) AS matching_genres

RETURN
    recommended.id AS id,
    recommended.title AS title,
    recommended.year AS year,
    recommended.rating AS rating,
    recommended.description AS description,
    recommended.poster_path AS poster_path,
    matching_genres AS recommendation_score

ORDER BY recommendation_score DESC, recommended.rating DESC
LIMIT 5
"""