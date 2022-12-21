// import {NavLink} from 'react-router-dom'
import './Nav.css';
import {NavLink} from 'react-router-dom'

// TODO implement form
function Nav() {
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
            {/* <form>
            <input type="search" name="q" placeholder="Search ..." v-model="input_value">
            <input type="submit" value="Go!">
        </form> */}
    <form>
        <input type="search" name="q" placeholder="Search ..." />
        <input type="submit" value="Go!" />
    </form>
    </nav> 
     );
}

export default Nav;