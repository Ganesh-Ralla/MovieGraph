import { Film, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon"><Film size={20} /></span>
          <span>MovieGraph</span>
        </Link>

        <form className="nav-search" onSubmit={submitSearch}>
          <Search size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..." aria-label="Search movies"/>
        </form>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search">Explore</Link>
        </nav>
      </div>
    </header>
  );
}
