
import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import assets from "../assets";


function Movies( ) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  return (
    <div className="moviesWrapper">
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.BeforeSunrise} alt="" />
        </figure>
        <div className="movie__title">
          Before Sunrise
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.BigFish} alt="" />
        </figure>
        <div className="movie__title">
          Big Fish
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.GhostDog} alt="" />
        </figure>
        <div className="movie__title">
          Ghost Dog
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.Mallrats} alt="" />
        </figure>
        <div className="movie__title">
          Mallrats
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.MeteorMan} alt="" />
        </figure>
        <div className="movie__title">
          Meteor Man
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
      <div className="movie">
        <figure className="movie__img--wrapper">
          <img className="movie__img" src={assets.BigHero6} alt="" />
        </figure>
        <div className="movie__title">
          Big Hero 6 
        </div>
        <div className="movie__ratings">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default Movies;