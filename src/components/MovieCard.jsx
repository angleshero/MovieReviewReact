
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div
      className="movie"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      style={{ cursor: "pointer" }}
    >
      <figure className="movie__img--wrapper">
        <img
          className="movie__img"
          src={movie.Poster}
          alt={movie.Title}
        />
      </figure>
      <div className="movie__title">{movie.Title}</div>
      <div className="movie__ratings">⭐ ⭐ ⭐ ⭐ ⭐</div>
    </div>
  );
}
