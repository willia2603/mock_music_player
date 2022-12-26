import "../css/Nav.css";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/search");
  };

  return (
    <nav>
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="albums">Albums</NavLink>
        </li>
        <li>
          <NavLink to="artists">Artists</NavLink>
        </li>
        <li>
          <NavLink to="tracks">Tracks</NavLink>
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="search" name="q" placeholder="Search ..." />
        <input type="submit" value="Go!" />
      </form>
    </nav>
  );
};

export default Nav;
