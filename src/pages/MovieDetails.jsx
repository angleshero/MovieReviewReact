
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/movies">← Back</Link>

      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: "250px" }} />

      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
    </div>
  );
}
