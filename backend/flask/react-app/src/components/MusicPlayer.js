import './MusicPlayer.css'
function MusicPlayer () {
    return ( 
        <div className="music-player">
            <div >
                <button>Previous</button>
                <button>Play</button>
                <button>Next</button>
            </div>
            <img src="/static/images/album_placeholder.jpeg" alt="album cover"/>
            <div>
                <span>No song is playing</span>
                <br/>
                <span></span>
                <br/>
                <span></span>
                <input type="range"/>
            </div>
            <div>
                <span>Volume</span>
                <input type="range" />
            </div>    
        </div>
     );
}

export default MusicPlayer ;