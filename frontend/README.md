# Movie Graph Frontend

React frontend for the CognoDB Movie Graph application.

## Backend

This frontend expects the Django REST backend to expose:

- `GET /api/movies/`
- `GET /api/movies/search/?q=<query>`
- `GET /api/movies/<movie_id>/`
- `GET /api/movies/<movie_id>/recommendations/`

Optional backend endpoint:

- `GET /api/recommendations/<user_id>/`

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the frontend:

```bash
npm run dev
```

The Django backend must be running separately.

## Features

- Guest-friendly movie discovery
- Movie search
- Movie detail page
- Connected actors, directors and genres
- Graph-powered movie recommendations
- Loading, empty and error states
- Responsive desktop/mobile UI

## Architecture

```text
React
  |
  +-- pages
  +-- components
  +-- api/client.js
  |
  v
Django REST API
  |
  v
CognoDB
```

The frontend intentionally has no authentication requirement. The backend's User nodes represent movie-viewing behavior used by the recommendation graph, not application login accounts.
