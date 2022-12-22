import { useState, useEffect } from 'react';
import DisplayArtistAlbum from '../components/DisplayArtistAlbum'
import DisplayTracks from '../components/DisplayTracks';
import axios from 'axios'

// TODO implement call to search
function Search () {
    const [loading, setLoading] = useState(true)
    const [tracks, setTracks] = useState(null)
    const [albums, setAlbums] = useState(null)
    const [artists, setArtists] = useState(null)
    const [match, setMatch] = useState(false)
    const [error, setError] = useState("")
    const [name, setName] = useState({})
    
    const route_name1 = 'albumTracks'
    const route_name2 = 'artistsInfo'
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:5000/api/v1/search?q=xhsh')
                setTracks(response.data.tracks)
                setAlbums(response.data.albums)
                setArtists(response.data.artists)
                setName(response.data.title)
                setLoading(false)
                // setMatch(true)
                console.log(response.data.length)
                
            } catch(e) {
                setError(e)
            }
        }
        fetchData()
    }, []) 
    
    function Empty() {
        return artists.length === 0 && albums.length === 0 && tracks.length === 0 
    }
    
    if (error) {
        return error
    }
    
    return ( 
        <> {!loading && !Empty() ? 
        <>  
            <h1>{name}</h1>
            <DisplayTracks name="Tracks" tracks={tracks} route_name1={route_name1} route_name2={route_name2}></DisplayTracks>
            <DisplayArtistAlbum list={albums} name="Albums" class1="albums-disp" class2="details" propriety="img_cover" route_name={route_name1} ></DisplayArtistAlbum>
            <DisplayArtistAlbum list={artists} name="Aritsts" class1="artists-disp" class2="details" propriety="artist_img" route_name={route_name2}></DisplayArtistAlbum>
        </>
        :
        "No match found"
        }</>
     );
}

export default Search ;