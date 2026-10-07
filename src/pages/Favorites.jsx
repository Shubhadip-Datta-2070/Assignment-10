
import MovieCard from "../components/MovieCard";

function Favorites({
  favorites,
  onFavorite
}) {
  return (
    <div className="favorites-page">

      <div className="page-heading">
        <h1>❤️ My Favorites</h1>

        <p>
          Your saved movies
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="message">
          <h2>No favorites yet</h2>

          <p>
            Search for movies and click ❤️ to
            add them to your favorites.
          </p>
        </div>
      ) : (
        <div className="movie-grid">

          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={true}
              onFavorite={onFavorite}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;
