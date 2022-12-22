import { useState, useEffect } from 'react';
import axios from 'axios'
import DispalyTracks from '../components/DisplayTracks'
function Track () {
    const [tracks, setTracks] = useState(null)
    const [name, setName] = useState("gghfhjgjh")
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const route_name1 = 'albumTracks'
    const route_name2 = 'artistsInfo'
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/tracks")
                setTracks(response.data.tracks);
                setName(response.data['title'])  
                // console.log(response.data.tracks)
                // console.log(response.data['title'])   
                // console.log(name)
                setLoading(false);
            } catch(error) {
                setError(error.message)
            }
        }

        fetchData(); 

    
    }, []);
    if (error) {
        return error
    }
    // console.log(typeof name)
    
    return ( 
        <> 
        {/* {!loading && 'hellooo' } */}
        {!loading && <DispalyTracks name={name} tracks={tracks} route_name1={route_name1} route_name2={route_name2}></DispalyTracks>}
        </>
        
     );
}

export default Track ;