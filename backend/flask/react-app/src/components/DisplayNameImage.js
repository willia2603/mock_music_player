function DisplayNameImage ({cl, name, src }) {
    return ( 
        <div className={cl}>
            <h1>{{name}}</h1>
            <img src={src}/>
        </div>
     );
}

export default DisplayNameImage ;