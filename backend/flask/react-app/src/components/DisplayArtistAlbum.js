import "../css/DisplayArtistAlbum.css";
import { NavLink } from "react-router-dom";

const DisplayArtistAlbum = ({
  list,
  name,
  class1,
  class2,
  propriety,
  route_name,
}) => (
  <section className={class1}>
    <h2>{name}</h2>
    <div className={class2}>
      <span>
        {list.map((el) => (
          <NavLink to={`/${route_name}/${el.id}`} key={el.id}>
            <img key={el.id} src={el[propriety]} />
          </NavLink>
        ))}
      </span>
    </div>
  </section>
);

export default DisplayArtistAlbum;
