import DisplayArtistAlbum from '../components/DisplayArtistAlbum';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

// TODO find out why container doesn't scroll 

// TODO create custom hook
function Home () {
    const [albums, setAlbums] = useState(null)
    const [name1, setName1] = useState("")
    const [artists, setArtists] = useState(null)
    const [name2, setName2] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const route_name1 = 'albumTracks'
    const route_name2 = 'artistsInfo'
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/hp");
                setArtists(response.data.artists);
                setAlbums(response.data.albums);
                // console.log(response.data.albums)
                setName1(response.data.name1)
                setName2(response.data.name2)
                setLoading(false);
                
            } catch (e) {
                setError(e.message)
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <> {loading ? 
            null 
            : 
            <> 
            <DisplayArtistAlbum list={albums} name={name1} class1="albums-disp" class2="details" propriety="img_cover" route_name={route_name1}/> 
            <DisplayArtistAlbum list={artists} name={name2} class1="artists-disp" class2="details" propriety="artist_img" route_name={route_name2} />
            </>  
        }
        </>
     );
}

export default Home ;