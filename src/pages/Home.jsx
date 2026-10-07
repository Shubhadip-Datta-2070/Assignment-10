
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const API_KEY = "YOUR_OMDB_API_KEY";

function Home({ favorites, onFavorite }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const searchMovies = async (page = 1) => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          search
        )}&page=${page}&type=movie`
      );

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(
          data.Error || "No movies found."
        );
      }

      setMovies(data.Search || []);
      setTotalResults(Number(data.totalResults) || 0);
      setCurrentPage(page);

    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentPage(1);
    searchMovies(1);
  };

  const handlePageChange = (page) => {
    searchMovies(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const isMovieFavorite = (movie) => {
    return favorites.some(
      (favorite) => favorite.imdbID === movie.imdbID
    );
  };

  const totalPages = Math.min(
    Math.ceil(totalResults / 10),
    100
  );

  return (
    <div className="home-page">

      <section className="search-section">

        <h1>Find Your Next Movie</h1>

        <p>
          Search thousands of movies using the OMDb database.
        </p>

        <form
          className="search-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            🔍 Search
          </button>
        </form>

      </section>

      {loading && <Loader />}

      {!loading && error && (
        <div className="message error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading &&
        !error &&
        searched &&
        movies.length === 0 && (
          <div className="message">
            <h2>No movies found</h2>
            <p>
              Try searching with a different movie title.
            </p>
          </div>
        )}

      {!loading && movies.length > 0 && (
        <>
          <section className="results-header">
            <h2>
              Search Results
            </h2>

            <p>
              {totalResults} movies found
            </p>
          </section>

          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={isMovieFavorite(movie)}
                onFavorite={onFavorite}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

    </div>
  );
}

export default Home;
