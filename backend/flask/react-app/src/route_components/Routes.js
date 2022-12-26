import { Route, Routes } from "react-router-dom";
import Album from "./album/Album";
import AlbumTracks from "./album/AlbumTracks";
import Artist from "./artists/Artist";
import ArtistInfo from "./artists/ArtistInfo";

export const ArtistRoutes = () => (
  <Routes>
    <Route index element={<Artist />} />
    <Route path=":id" element={<ArtistInfo />} />
  </Routes>
);

export const AlbumRoutes = () => (
  <Routes>
    <Route index element={<Album />} />
    <Route path=":id" element={<AlbumTracks />} />
  </Routes>
);
