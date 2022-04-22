import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {
    
    const currentUser= JSON.parse(sessionStorage.getItem('putt_user'));
    const userName = currentUser.firstName;

    //will have functions to calculate the values
    
    //MOVED THESE OUT OF THE RETURN TO SEE HOW IT WOULD LOOK 
    // <h2>Welcome  to Putt Tracker!</h2>
    //<p className="slogan">The Putting Tool For Disc Golfers</p>


    return (
        <>
            <div className="home__greeting">
                    

                    <div className="userScorecard">
                        <h3>{userName}'s Scorecard</h3>
                        <div className="wrapper">
                            <div className="scorecardItem">Total Rounds:</div>
                            <div className="scorecardItem">24</div>
                            <div className="scorecardItem">Total Putts:</div>
                            <div className="scorecardItem">312</div>
                            <div className="scorecardItem">Putts Made:</div>
                            <div className="scorecardItem">276</div>
                            <div className="scorecardItem">Putting %</div>
                            <div className="scorecardItem">88%</div>

                        </div>
                    </div>



                    <div className="home__greeting__buttons">
                        <Link to={`/discs`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/rounds`}>
                            <button>My Rounds</button>
                        </Link>
                        <Link to={`/create/round`}>
                            <button>Start Putting</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}

