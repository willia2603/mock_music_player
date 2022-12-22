import '../css/DisplayArtistAlbum.css'
// TODO add clickable link
function DisplayArtistAlbum ({list, name, class1, class2, propriety, route_name }) {
    return ( 
        <section className={class1}>
        <h2>{name}</h2>
        <div className={class2}>
            <span>
                {list.map((el) => (<img key={el.id} src={el[propriety]}/>))  }
            </span>
        </div>
    </section>
        
        
        
        
        );
}

export default DisplayArtistAlbum ;