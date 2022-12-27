import "../css/DisplayArtistAlbum.css";

const DisplayNameImage = ({ path, name, class1 }) => (
  <div className={class1}>
    <h1>{name}</h1>
    <img src={path} alt="something" />
  </div>
);

export default DisplayNameImage;
