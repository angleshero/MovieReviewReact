
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetails.jsx"; 
import "./App.css";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <Router>
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Movies list page */}
      <Route path="/movies" element={<Movies />} />

      {/* Movie detail page */}
      <Route path="/movies/:id" element={<MovieDetail />} />

      {/* Fallback for any unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/footer" element={<Footer />} />
    </Routes>
    </Router>
  );
}
