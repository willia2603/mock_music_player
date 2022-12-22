import './css/App.css';
import Nav from './components/Nav'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './route_components/Home'
import Album from './route_components/album/Album'
import Artist from './route_components/artists/Artist'
import Track from './route_components/Track'
import Search from './route_components/Search';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <>
      <header>
        <h1>Spotify (almost)</h1>
      </header>
      <div className="page-layout">
      <BrowserRouter>
      <Nav/>
        <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='albums' element={<Album/>}/>
          <Route path='artists' element={<Artist/>}/>
          <Route path='tracks' element={<Track/>}/>
          <Route path='search' element={<Search/>}/>
        </Routes>
        </main>
    </BrowserRouter>
      </div>
      <footer >
      <MusicPlayer></MusicPlayer>
      </footer>
    </>
  );
}

export default App;
