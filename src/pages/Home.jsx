import { useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const API_KEY = "5f718273";

function Home({ favorites, onFavorite }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = async (pageNumber = 1) => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          search
        )}&page=${pageNumber}&type=movie`
      );

      if (!response.ok) {
        throw new Error("Failed to connect to OMDb API.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No movies found.");
      } else {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
        setPage(pageNumber);
      }
    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError("Unable to load movies. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchMovies(1);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="home-page">
      <section className="search-section">
        <h1>🎬 Movie Search</h1>
        <p>Search for your favorite movies</p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>
      </section>

      {loading && <Loader />}

      {!loading && error && (
        <div className="message error-message">
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="message">
          Search for a movie to get started.
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                favorites={favorites}
                onFavorite={onFavorite}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => searchMovies(newPage)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;