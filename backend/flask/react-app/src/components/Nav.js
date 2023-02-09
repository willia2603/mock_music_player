import "../css/Nav.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    navigate(`/search/${searchValue}`);
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
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search ..."
          type="search"
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <input type="submit" value="Go!" />
      </form>
    </nav>
  );
};

export default Nav;
