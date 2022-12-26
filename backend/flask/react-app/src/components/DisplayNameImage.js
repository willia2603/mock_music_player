/* eslint-disable react/prop-types */
import "../css/DisplayArtistAlbum.css";
function DisplayNameImage({ path, name, class1 }) {
  return (
    <div className={class1}>
      <h1>{name}</h1>
      <img src={path} alt="something" />
    </div>
  );
}

export default DisplayNameImage;
