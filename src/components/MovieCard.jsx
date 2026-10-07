
import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, onFavorite }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card">
      <img
        src={poster}
        alt={movie.Title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p className="movie-year">
          {movie.Year}
        </p>

        <p className="movie-type">
          {movie.Type}
        </p>

        <div className="movie-actions">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="details-btn"
          >
            View Details
          </Link>

          <button
            className={`favorite-btn ${
              isFavorite ? "active" : ""
            }`}
            onClick={() => onFavorite(movie)}
            title={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
