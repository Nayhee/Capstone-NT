import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {
    
    // const currentUser= JSON.parse(sessionStorage.getItem('putt_user'));
    // const userName = currentUser.firstName;
    

    return (
        <>
            <div className="home__greeting">
                    <h2>Welcome  to Putt Tracker!</h2>
                    <p className="slogan">The Putting Tool For Disc Golfers</p>
                    <div className="home__greeting__buttons">
                        <Link to={`/discs`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/rounds`}>
                            <button>My Rounds</button>
                        </Link>
                        <Link to={`/putt`}>
                            <button>Start Putting</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}

//need to fix getLoggedInUsers name. 

