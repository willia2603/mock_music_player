import '../css/DisplayTracks.css'

function DisplayTracks({tracks, name, routeName1, routeName2}) {
    function loadTrack(track) {
        // store.commit('loadTrack', track)
        console.log('track loaded')
      }
    function setTrackList() {
        // store.commit('setTrackList', props.tracks)
        console.log('track list setted')
      }
      
    return ( 
        <>
        <h2>{name}</h2>
        {/* TODO: set onmouseover to only fire once */}
        <div className="tracks" onMouseOver={setTrackList}>
            {/* loop on tracks*/}
            {tracks.map((track) => {
                return (<div className="track" key={track.id}>

                    <span><u>Track Name:</u><br/><br/><a href="" onClick={loadTrack(track)}>{track.name}</a></span>
                    <span><u>Album Name:</u> <br/>
                    {/* put this in router link */}
                    {/* <RouterLink :to="{name: route_name1, params: {id : track.album_id}}">{{track.album.name}} </RouterLink> */}
                    <p>{track.album.name}</p>
                    </span>
                    <span><u>Artist:</u><br/><br/>
                    {track.artists.map((artist) => {
                        return <span key={artist.id}>{artist.name}</span>
                        // <span  key={artist.id + Math.random()}>
                        //     {artist}
                        //     {/* add router link */}
                        //     {/* <RouterLink  :to="{name: route_name2, params: {id : artist.id} }">{{artist.name}}<br></RouterLink> */}
                        // </span>
                    })}
                    </span>
                    <span><u>Duration:</u><br/><br/>{track.duration}</span>
                </div>  )               
            })}
        </div>
        </>
     );
}

export default DisplayTracks;