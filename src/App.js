
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetails.jsx"; 
// If your file is named MovieDetails.jsx instead, use:
// import MovieDetail from "./pages/MovieDetails.jsx";

import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Movies list page */}
      <Route path="/movies" element={<Movies />} />

      {/* Movie detail page */}
      <Route path="/movies/:id" element={<MovieDetail />} />

      {/* Fallback for any unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
