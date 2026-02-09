
import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export default function Movies() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [movies, setMovies] = useState([]); // normalized
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!query.trim()) {
        setMovies([]);
        setError("");
        setLoading(false);
        return;
      }

      if (!API_KEY) {
        setMovies([]);
        setError("Missing REACT_APP_OMDB_API_KEY in .env");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          query
        )}`;
        const res = await fetch(url);
        const data = await res.json();

        if (cancelled) return;

        if (data?.Response === "True" && Array.isArray(data.Search)) {
          const normalized = data.Search.map((m) => ({
            id: m.imdbID, // used for /movies/:id
            title: m.Title,
            year: Number.parseInt(m.Year, 10) || m.Year,
            poster:
              m.Poster && m.Poster !== "N/A"
                ? m.Poster
                : "/posters/placeholder.jpg",
            imdbID: m.imdbID,
          }));
          setMovies(normalized);
        } else {
          setMovies([]);
          if (data?.Error) setError(data.Error);
        }
      } catch (e) {
        if (!cancelled) {
          setMovies([]);
          setError(e.message || "Network error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const visible = useMemo(() => {
    const parseYear = (y) => {
      if (typeof y === "number") return y;
      const n = parseInt(y, 10);
      return Number.isFinite(n) ? n : 0;
    };

    const sorted = [...movies].sort((a, b) => {
      if (sort === "newest") return parseYear(b.year) - parseYear(a.year);
      return parseYear(a.year) - parseYear(b.year);
    });

    return sorted.slice(0, 6);
  }, [movies, sort]);

  return (
    <>
      <header>
        <h1 className="site-title">Movie Reviews NOW!</h1>
        <nav>
          <input
            type="text"
            placeholder="Search movies"
            className="searchName"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="sort-container">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </nav>
      </header>

      <main>
        {loading && <p style={{ padding: 20 }}>Loading...</p>}
        {error && !loading && (
          <p style={{ padding: 20, color: "#f87171" }}>Error: {error}</p>
        )}

        <div className="movies">
          {visible.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </main>
    </>
  );
}
