
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const API_KEY = "YOUR_OMDB_API_KEY";

function MovieDetails({
  favorites,
  onFavorite
}) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(
            data.Error || "Movie not found."
          );
        }

        setMovie(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="message error">
        <h2>Unable to load movie</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/400x600?text=No+Poster";

  const isFavorite = favorites.some(
    (favorite) =>
      favorite.imdbID === movie.imdbID
  );

  return (
    <div className="details-page">

      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <div className="details-card">

        <img
          src={poster}
          alt={movie.Title}
          className="details-poster"
        />

        <div className="details-content">

          <h1>{movie.Title}</h1>

          <div className="details-meta">
            <span>{movie.Year}</span>
            <span>{movie.Runtime}</span>
            <span>{movie.Rated}</span>
          </div>

          <div className="rating-box">
            <span>⭐</span>
            <strong>{movie.imdbRating}</strong>
            <small>/ 10 IMDb</small>
          </div>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Released:</strong> {movie.Released}
          </p>

          <p>
            <strong>Language:</strong> {movie.Language}
          </p>

          <div className="plot">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>

          <div className="ratings">

            <h3>Ratings</h3>

            {movie.Ratings?.length > 0 ? (
              movie.Ratings.map((rating, index) => (
                <div
                  className="rating-row"
                  key={index}
                >
                  <span>
                    {rating.Source}
                  </span>

                  <strong>
                    {rating.Value}
                  </strong>
                </div>
              ))
            ) : (
              <p>No ratings available.</p>
            )}

          </div>

          <button
            className={`favorite-large ${
              isFavorite ? "active" : ""
            }`}
            onClick={() => onFavorite(movie)}
          >
            {isFavorite
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;
