import React, {useState} from "react"
import {NavBar} from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Capstone.css"

//returns and displays 2 child components: 1) Navbar (links) and 2) AppViews (routes)

export const Capstone = () => {
    // Set initial state. If no there's no user in storage, expression is false. If there's a user in storage, expression is true. 
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("putt_user") !== null)

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("putt_user") !== null)
    }
    
    return (
        <>
            <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
            <ApplicationViews 
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                />
        </>
    )
}
//passing ClearUser to NavBar so that when users click "Logout" button in Navbar, the user is cleared!
//passing State (isAuthenticated) to NavBar so that it can use it to check if user is Authenticated and block certain routes accordingly. 
//passing IsAuthenticated and SetIsAuthenticated to AppViews so that they can be used by login and Register components. 