import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clapperboard, Star, Sparkles, } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getMovie, getMovieRecommendations } from "../api/client";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";

export default function MovieDetails() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(true);
  const [error, setError] = useState("");
  const [recError, setRecError] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError("");

      const data = await getMovie(movieId);
      setMovie(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Movie could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadRecommendations() {
    try {
      setRecLoading(true);
      setRecError("");

      const data = await getMovieRecommendations(movieId);

      setRecommendations(data);
    } catch (err) {
      setRecError(
        err.response?.data?.error || "Recommendations could not be loaded."
      );
    } finally {
      setRecLoading(false);
    }
  }

  useEffect(() => {
    load();
    loadRecommendations();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [movieId]);

  if (loading) {
    return <Loading text="Loading movie graph..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={load} />;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="details-page">

      <Link to="/" className="back-link"><ArrowLeft size={16} />Back to movies</Link>

      <section className="detail-hero">

        <div className="detail-poster">

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detail-poster-image" />

          <div className="detail-poster-overlay" />
          <div className="detail-poster-content">
            <span className="detail-poster-label">MOVIE</span>
            <h2>{movie.title}</h2>
            <div className="detail-poster-meta">
              <span><Calendar size={13} /> {movie.year}</span>
              <span><Star size={13} fill="currentColor" />{movie.rating?.toFixed(1)}</span>
            </div>
          </div>
        </div>


        <div className="detail-copy">
          <span className="eyebrow"><Clapperboard size={15} />MOVIE DETAILS</span>

          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span><Calendar size={16} />{movie.year}</span>
            <span><Star size={16} fill="currentColor" />{movie.rating?.toFixed(1)}</span>
          </div>

          <p className="detail-description">{movie.description}</p>

          {movie.genres?.length > 0 && (
            <div className="tag-row">
              {movie.genres.map((genre) => (<span className="tag" key={genre.id} >{genre.name}</span>))}
            </div>
          )}

        </div>
      </section>

      <section className="content-section details-recommendations">
        <SectionHeader title="You may also like" subtitle="Recommendations based on movies sharing similar genres." />

        {recLoading && (<Loading text="Finding similar movies..." />)}

        {!recLoading && recError && (<ErrorState message={recError} onRetry={loadRecommendations} />)}

        {!recLoading && !recError && recommendations.length === 0 && (
          <div className="state-card">
            <Sparkles size={30} />
            <h3>No recommendations yet</h3>
            <p>
              There are no other movies sharing this
              movie's genres.
            </p>
          </div>
        )}

        {!recLoading && !recError && recommendations.length > 0 && (
            <div className="movie-grid">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="recommendation-wrap">
                  <MovieCard movie={recommendation} />

                  <span className="score-badge">
                    {recommendation.recommendation_score} matching genre
                    {recommendation.recommendation_score === 1 ? "" : "s"}
                  </span>

                </div>
              ))}
            </div>
          )}
      </section>

    </div>
  );
}