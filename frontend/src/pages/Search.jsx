import { useEffect, useState } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getMovies, searchMovies } from "../api/client";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(value = query) {
    try {
      setLoading(true);
      setError("");
      const clean = value.trim();
      const data = clean ? await searchMovies(clean) : await getMovies();
      setMovies(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Search failed. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQuery(initialQuery);
    load(initialQuery);
  }, [initialQuery]);

  function submit(event) {
    event.preventDefault();
    const clean = query.trim();
    if (clean) setParams({ q: clean });
    else setParams({});
  }

  return (
    <section className="search-page">
      <div className="search-heading">
        <span className="eyebrow"><SlidersHorizontal size={15} /> DISCOVER</span>
        <h1>Explore movies</h1>
        <p>Search the movie graph by title.</p>
      </div>

      <form className="large-search" onSubmit={submit}>
        <SearchIcon size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try Iron Man, Avengers..." autoFocus/>
        <button className="button primary" type="submit">Search</button>
      </form>

      {loading && <Loading text="Searching the graph..." />}
      {!loading && error && <ErrorState message={error} onRetry={() => load()} />}
      {!loading && !error && movies.length === 0 && (
        <EmptyState title="No matching movies" text={query ? `Nothing matched "${query}". Try another title.` : "No movies are available."}/>
      )}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="results-caption">
            {query ? `Results for "${query}"` : "All movies"}
            <span>{movies.length} movie{movies.length === 1 ? "" : "s"}</span>
          </div>
          <div className="movie-grid">
            {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </>
      )}
    </section>
  );
}
