import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <nav className="NavBar">
      <Link to="/" className="Nav__link">
        Home
      </Link>
      <Link to="/articles" className="Nav__link">
        Articles
      </Link>
      <Link to="/topics" className="Nav__link">
        Topics
      </Link>
      <Link to="/profile" className="Nav__link">
        User Profile
      </Link>
    </nav>
  );
};
