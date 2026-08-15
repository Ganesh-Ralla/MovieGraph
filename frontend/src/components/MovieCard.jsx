import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-modern">
      <div className="movie-card-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} loading="lazy"/>

        <div className="movie-card-overlay" />

        <div className="movie-rating-badge">
          <Star size={13} fill="currentColor" />
          <span>{movie.rating?.toFixed(1)}</span>
        </div>
      </div>

      <div className="movie-card-info">
        <h3>{movie.title}</h3>

        <div className="movie-card-meta">
          <span><Calendar size={14} />{movie.year}</span>

          <span><Star size={14} fill="currentColor" />{movie.rating?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}