
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-title">MOVIES</h1>
      <button className="enter-btn" onClick={() => navigate("/movies")}>
        ENTER
      </button>
    </div>
  );
}
