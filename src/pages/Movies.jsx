
import React, { useEffect, useMemo, useState } from "react";

const API_KEY = "21463539"; // ← replace with your key

export default function Movies() {
  const [query, setQuery] = useState("");           // search term
  const [movies, setMovies] = useState([]);         // raw results
  const [sortBy, setSortBy] = useState("newest");   // 'newest' | 'oldest'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce the query so we don't fetch on every keystroke
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 400);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch movies whenever debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setError("");
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          debouncedQuery
        )}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          setError(data.Error || "No results found.");
        } else {
          // Ensure Year is numeric where possible
          const sanitized = (data.Search || []).map((m) => ({
            ...m,
            // Some years are like "2010–2013". Grab the first number to sort.
            _YearNum: Number(String(m.Year).match(/\d{4}/)?.[0]) || 0,
          }));
          setMovies(sanitized);
        }
      } catch (e) {
        setError("Failed to fetch movies. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  // Sort and limit to first 6
  const visibleMovies = useMemo(() => {
    const list = [...movies];
    if (sortBy === "newest") {
      list.sort((a, b) => b._YearNum - a._YearNum);
    } else if (sortBy === "oldest") {
      list.sort((a, b) => a._YearNum - b._YearNum);
    }
    return list.slice(0, 6);
  }, [movies, sortBy]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Movies</h1>

      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "0.75rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
          aria-label="Search movies"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
            background: "white",
          }}
          aria-label="Sort movies"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* Search label (replaces your searchName.innerHTML) */}
      <div style={{ marginBottom: "0.5rem", color: "#666" }}>
        {query ? (
          <span>
            Showing results for: <strong>{query}</strong>
          </span>
        ) : (
          <span>Type to search</span>
        )}
      </div>

      {/* Status */}
      {loading && <p>Loading…</p>}
      {error && !loading && <p style={{ color: "crimson" }}>{error}</p>}

      {/* Grid */}
      <div
        className="movies"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {!loading && !error && visibleMovies.length === 0 && query && (
          <p>No movies found.</p>
        )}

        {visibleMovies.map((movie) => (
          <div
            key={`${movie.imdbID}`}
            className="movie"
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: "0.75rem",
              background: "white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
              style={{
                width: "100%",
                height: 270,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h2 style={{ fontSize: 16, margin: "0.25rem 0 0" }}>
              {movie.Title}
            </h2>
            <h4 style={{ fontWeight: 400, color: "#666", margin: 0 }}>
              {movie.Year}
            </h4>
            <button
              style={{
                marginTop: "auto",
                padding: "0.5rem 0.75rem",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#f8f8f8",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")
              }
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
``
