
import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function Movies() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  const visible = useMemo(() => {
    const parseYear = (y) => parseInt(y) || 0;

    const sorted = [...movies].sort((a, b) => {
      if (sort === "newest") return parseYear(b.Year) - parseYear(a.Year);
      return parseYear(a.Year) - parseYear(b.Year);
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

        <div className="movies">
          {visible.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>
      </main>
    </>
  );
}
