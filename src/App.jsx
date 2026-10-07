
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

import "./App.css";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites =
      localStorage.getItem("movieFavorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {

      const exists = currentFavorites.some(
        (favorite) =>
          favorite.imdbID === movie.imdbID
      );

      if (exists) {
        return currentFavorites.filter(
          (favorite) =>
            favorite.imdbID !== movie.imdbID
        );
      }

      return [
        ...currentFavorites,
        movie
      ];
    });
  };

  return (
    <BrowserRouter>

      <Navbar
        favoriteCount={favorites.length}
      />

      <main>

        <Routes>

          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                favorites={favorites}
                onFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onFavorite={toggleFavorite}
              />
            }
          />

        </Routes>

      </main>

      <footer>
        <p>
          MovieFinder • Powered by OMDb API
        </p>
      </footer>

    </BrowserRouter>
  );
}

export default App;
