import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

const API_KEY = "5f718273";

function MovieDetails({ favorites, onFavorite }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );

        if (!response.ok) {
          throw new Error("Failed to connect to OMDb API.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          setError(data.Error || "Movie not found.");
          return;
        }

        setMovie(data);
      } catch (err) {
        setError(
          "Unable to load movie details. Please check your internet connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="message error-message">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="message">
        Movie details not available.
      </div>
    );
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.imdbID === movie.imdbID
  );

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <div className="details-container">
        <div className="details-poster">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={movie.Title}
          />
        </div>

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <p className="movie-meta">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <button
            className={`favorite-button ${
              isFavorite ? "favorite-active" : ""
            }`}
            onClick={() => onFavorite(movie)}
          >
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <div className="rating-box">
            <span>⭐ IMDb Rating</span>
            <strong>
              {movie.imdbRating !== "N/A"
                ? movie.imdbRating
                : "Not Rated"}
            </strong>
          </div>

          <div className="detail-section">
            <h3>Genre</h3>
            <p>{movie.Genre}</p>
          </div>

          <div className="detail-section">
            <h3>Released</h3>
            <p>{movie.Released}</p>
          </div>

          <div className="detail-section">
            <h3>Director</h3>
            <p>{movie.Director}</p>
          </div>

          <div className="detail-section">
            <h3>Actors</h3>
            <p>{movie.Actors}</p>
          </div>

          <div className="detail-section">
            <h3>Language</h3>
            <p>{movie.Language}</p>
          </div>

          <div className="detail-section">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="detail-section">
              <h3>Ratings</h3>

              <div className="ratings-list">
                {movie.Ratings.map((rating, index) => (
                  <div className="rating-item" key={index}>
                    <span>{rating.Source}</span>
                    <strong>{rating.Value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;