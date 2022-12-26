import "./css/App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./route_components/Home";
import Track from "./route_components/Track";
import Search from "./route_components/Search";
import MusicPlayer from "./components/MusicPlayer";
import { ArtistRoutes, AlbumRoutes } from "./route_components/Routes";

function App() {
  return (
    <>
      <header>
        <h1>Spotify (almost)</h1>
      </header>
      <div className="page-layout">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="albums/*" element={<AlbumRoutes />} />
            <Route path="artists/*" element={<ArtistRoutes />} />
            <Route path="tracks" element={<Track />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </main>
      </div>
      <footer>
        <MusicPlayer></MusicPlayer>
      </footer>
    </>
  );
}

export default App;
