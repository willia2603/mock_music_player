// import {NavLink} from 'react-router-dom'
import '../css/Nav.css';
import {NavLink} from 'react-router-dom'

// TODO implement form
function Nav() {
    function gotoResult(){
        // router.push({name: 'search', params: {query : input_value.value} })
      }
    return ( 
    <nav>
    <h2>Menu</h2>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="albums">Albums</NavLink></li>
        <li><NavLink to="artists">Artists</NavLink></li>
        <li><NavLink to="tracks">Tracks</NavLink></li>
        <li><NavLink to="search">Search</NavLink></li>
    </ul>
    {/* TODO prevnt page from reloading */}
    <form onSubmit={gotoResult}>
        {/* TODO: get value */}
        <input type="search" name="q" placeholder="Search ..." />
        <input type="submit" value="Go!" />
    </form>
    </nav> 
     );
}

export default Nav;