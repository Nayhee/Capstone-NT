import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "./NavBar.css"

//navbar component contains links to the different Routes. 
//renders a hyperlink in the DOM, and when clicked, it will change the URL in the browser to the value of the "to" attribute. 

export const NavBar = ({ clearUser, isAuthenticated }) => {
    
    const navigate = useNavigate();
    //hook that allows us to go to a different URL.

    const handleLogout = () => {
        clearUser();
        navigate('/login')
    }
    
    const location = useLocation();
    //hook that returns the location Obj containing info about current URL. New location Obj returned when URL changes. 

    //use a isAuthenticated (state passed from Capstone.js) to block certain links until a user is authenticated. 
    //use a ternary with location.pathname to change class of active URL to "active". 

    //isAuthenticated is the State passed from Capstone.js that lets us block certain Links if the User is not Authenticated. 
    //if logged in, display logout. If not logged in, display Login. 

    return (

                <ul className="navbar">

                    <li className="navbar__item">
                        <img className="navbar__logo" src="images/editedLogo.png"/>
                    </li>

                    {isAuthenticated && <li className="navbar__item">
                        <Link className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>}

                    {isAuthenticated && <li className="navbar__item">
                        <Link className={`navbar__link ${location.pathname === '/rounds/create' ? 'active' : ''}`} to="/rounds/create">Track</Link>
                    </li>}

                    {isAuthenticated && <li className="navbar__item">
                        <Link className={`navbar__link ${location.pathname === '/discs' ? 'active' : ''}`} to="/discs">Discs</Link>
                    </li>}

                    {isAuthenticated && <li className="navbar__item">
                        <Link className={`navbar__link ${location.pathname === '/rounds' ? 'active' : ''}`} to="/rounds">Rounds</Link>
                    </li>}

                    {isAuthenticated
                        ? <li className="navbar__item">
                            <Link className="navbar__link" to="/" onClick={handleLogout}> Logout </Link>
                        </li>
                        : <li className="navbar__item">
                            <Link className="navbar__link" to="/login">Login</Link>
                        </li>}
                        
                </ul>

    )
}
