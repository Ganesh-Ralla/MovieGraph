import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getMovies } from "../api/client";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMovies() {
    try {
      setLoading(true);
      setError("");

      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(
        err.response?.data?.error || "The movie database could not be reached. Make sure Django and CognoDB are running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);



  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={15} /> GRAPH-POWERED MOVIE DISCOVERY</span>
          <h1>Find your next<br /><span>favorite movie.</span></h1>
          <p>
            Explore movies, discover their connected cast and genres,
            and get recommendations powered by relationships in the graph.
          </p>
          <div className="hero-actions">
            <Link to="/search" className="button primary">Explore movies <ArrowRight size={17} /></Link>
            <span className="hero-note">No account required</span>
          </div>
        </div>
        <div className="hero-orbit">
          <div className="orbit orbit-1"><span>MOVIE</span></div>
          <div className="orbit orbit-2"><span>ACTOR</span></div>
          <div className="orbit orbit-3"><span>GENRE</span></div>
          <div className="hero-core"><Sparkles size={27} /></div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeader title="Explore the collection" subtitle="Movies currently stored in the graph."
          action={<Link to="/search" className="text-link">View all <ArrowRight size={15} /></Link>} />

        {loading && <Loading text="Loading movies from CognoDB..." />}
        {!loading && error && <ErrorState message={error} onRetry={loadMovies} />}
        {!loading && !error && movies.length === 0 && <EmptyState text="The graph does not contain any movies yet." />}
        {!loading && !error && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </section>
    </div>
  );
}
