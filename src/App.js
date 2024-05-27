import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import FavoriteMovies from "./pages/FavoriteMovies";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <nav>
          <img src="/logo.png" alt="logo" />
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/signin">Sign In</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
      </Routes>
    </Router>
  );
}

export default App;