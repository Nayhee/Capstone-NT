import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
// import { faHouse } from '@fontawesome/free-solid-svg-icons'


export const NavBar = ({ clearUser, isAuthenticated }) => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/login')   //changed from home to Login since homepage is user specific. 
    }
    
    return (
        <ul className="navbar">
            
            <li className="navbar__logo__li">
                <img className="navbar__logo" src="images/LOGO8.png"></img>
            </li>

            {isAuthenticated && <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>}

            {isAuthenticated && <li className="navbar__item">
                <Link className="navbar__link" to="/putt">Putt</Link>
            </li>}

            {isAuthenticated && <li className="navbar__item">
                <Link className="navbar__link" to="/discs">Discs</Link>
            </li>}

            {isAuthenticated && <li className="navbar__item">
                <Link className="navbar__link" to="/rounds">Rounds</Link>
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
//isAuthenticated is the State passed from Capstone.js that lets us block certain Links if the User is not Authenticated. 
//if logged in, display logout. If not logged in, display Login. 

//when I created the logo.
// {/* <div className="navbar__logo">
//                 <p>Putt</p>
//                 <p>Tracker</p>
//             </div> */}