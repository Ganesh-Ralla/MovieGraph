# 🎬 MovieGraph

MovieGraph is a full-stack movie discovery and recommendation application built with **React, Django REST Framework, and CognoDB**.

The project demonstrates how a **graph database can be used to store relationships between movies and genres and use those relationships to generate movie recommendations**.

Users can browse movies, search for movies, view movie details, and get recommendations based on shared genres.

---

## 🔗 Live Application

### Frontend

https://movie-graph-ganesh-ralla.vercel.app/

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Python
- Django
- Django REST Framework
- Gunicorn

### Database

- CognoDB
- Neo4j-compatible Graph Database
- Cypher Query Language
- Neo4j Python Driver

### External API

- TMDB (The Movie Database)

### Deployment

- Vercel — Frontend
- Render — Backend
- CognoDB — Graph Database

---

## 🎞️ TMDB Usage

MovieGraph uses **TMDB (The Movie Database)** as the source for movie information.

The movie data collected from TMDB includes:

- Movie ID
- Movie title
- Description
- Release date
- Rating
- Poster path
- Genre IDs

The collected TMDB response is stored in `data.json`.

The data is then processed by the Django backend and seeded into CognoDB.

The data flow is:

```text
TMDB
  ↓
data.json
  ↓
seed.py
  ↓
CognoDB
