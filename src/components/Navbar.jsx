
import { Link } from "react-router-dom";

function Navbar({ favoriteCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 MovieFinder
      </Link>

      <div className="nav-links">
        <Link to="/">Search</Link>

        <Link to="/favorites" className="favorites-link">
          ❤️ Favorites
          <span className="favorite-count">
            {favoriteCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
