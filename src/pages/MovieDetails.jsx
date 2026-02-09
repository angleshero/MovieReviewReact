
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MERGED_MOVIES_MAP } from "../data/movies.js";

const API_KEY = import.meta.env?.VITE_OMDB_API_KEY;

export default function MovieDetail() {
  const { id } = useParams();

  // Local-first: look up by our merged id
  const localMovie = useMemo(() => MERGED_MOVIES_MAP.get(String(id)), [id]);

  const [omdb, setOmdb] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    // If route id is an IMDb id (tt\d+) use it; else use localMovie.imdbID if present
    const imdbIdFromRoute = /^tt\d+$/i.test(id) ? id : null;
    const imdbId = imdbIdFromRoute || localMovie?.imdbID;

    if (!API_KEY || !imdbId) {
      setOmdb(null);
      setStatus("done");
      return;
    }

    setStatus("loading");
    setError("");

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(
      imdbId
    )}&plot=full`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.Response === "False") {
          setError(data?.Error || "No additional data found.");
          setStatus("error");
          setOmdb(null);
        } else {
          setOmdb(data);
          setStatus("done");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Network error.");
        setStatus("error");
        setOmdb(null);
      });

    return () => {
      cancelled = true;
    };
  }, [id, localMovie]);

  // If we have nothing at all
  if (!localMovie && status !== "loading" && !omdb) {
    return (
      <div style={{ padding: "20px" }}>
        <Link to="/movies">← Back</Link>
        <p style={{ marginTop: 16 }}>Movie not found.</p>
      </div>
    );
  }

  // Prefer local fields; fall back to OMDb
  const title =
    localMovie?.title || omdb?.Title || localMovie?.name || "Untitled";
  const poster =
    localMovie?.poster ||
    omdb?.Poster ||
    localMovie?.img ||
    "/posters/placeholder.jpg";
  const year = localMovie?.year || omdb?.Year;
  const rated = localMovie?.rating || omdb?.Rated;
  const genres =
    (Array.isArray(localMovie?.genres) && localMovie.genres.join(", ")) ||
    omdb?.Genre;
  const plot = localMovie?.description || omdb?.Plot;
  const runtime = localMovie?.runtime || omdb?.Runtime;
  const director = localMovie?.director || omdb?.Director;
  const cast =
    (Array.isArray(localMovie?.cast) && localMovie.cast.join(", ")) ||
    omdb?.Actors;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/movies">← Back</Link>

      <h2 style={{ marginTop: 16 }}>
        {title} {year ? `(${year})` : ""}
      </h2>

      <img
        src={poster}
        alt={title}
        style={{
          maxWidth: "250px",
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #1f2937",
          objectFit: "cover",
          background: "#222",
        }}
      />

      {rated ? (
        <p>
          <strong>Rated:</strong> {rated}
        </p>
      ) : null}
      {runtime ? (
        <p>
          <strong>Runtime:</strong> {runtime}
        </p>
      ) : null}
      {genres ? (
        <p>
          <strong>Genre:</strong> {genres}
        </p>
      ) : null}
      {director ? (
        <p>
          <strong>Director:</strong> {director}
        </p>
      ) : null}
      {cast ? (
        <p>
          <strong>Actors:</strong> {cast}
        </p>
      ) : null}
      {plot ? (
        <p>
          <strong>Plot:</strong> {plot}
        </p>
      ) : null}

      {/* Status messages (optional) */}
      {status === "loading" && (
        <p style={{ color: "#9ca3af" }}>Fetching extra details…</p>
      )}
      {status === "error" && error && (
        <p style={{ color: "#f87171" }}>Couldn’t load extra details: {error}</p>
      )}
    </div>
  );
}
