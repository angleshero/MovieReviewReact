
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env?.VITE_OMDB_API_KEY;

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (!API_KEY) {
      setStatus("error");
      setError("OMDB_API_KEY in .env");
      return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(
      id
    )}&plot=full`;

    setStatus("loading");
    setError("");

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.Response === "False") {
          setStatus("error");
          setError(data?.Error || "Movie not found");
          setMovie(null);
        } else {
          setMovie(data);
          setStatus("done");
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setStatus("error");
        setError(e.message || "Network error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") return <p style={{ padding: 20 }}>Loading…</p>;
  if (status === "error")
    return (
      <div style={{ padding: 20 }}>
        <Link to="/movies">← Back</Link>
        <p style={{ color: "#f87171", marginTop: 16 }}>Error: {error}</p>
      </div>
    );

  if (!movie)
    return (
      <div style={{ padding: 20 }}>
        <Link to="/movies">← Back</Link>
        <p style={{ marginTop: 16 }}>Movie not found.</p>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/movies">← Back</Link>

      <h2 style={{ marginTop: 16 }}>
        {movie.Title} {movie.Year ? `(${movie.Year})` : ""}
      </h2>

      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{
          maxWidth: "250px",
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #1f2937",
          objectFit: "cover",
          background: "#222",
        }}
      />

      {movie.Rated && (
        <p>
          <strong>Rated:</strong> {movie.Rated}
        </p>
      )}
      {movie.Runtime && (
        <p>
          <strong>Runtime:</strong> {movie.Runtime}
        </p>
      )}
      {movie.Genre && (
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
      )}
      {movie.Director && (
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
      )}
      {movie.Actors && (
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
      )}
      {movie.Plot && (
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
      )}
    </div>
  );
}

