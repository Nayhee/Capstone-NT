import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {
    
    // const [usersName, setUsersName] = useState([]);


    // const getLoggedInUsersName = () => {
    //     let userObj = sessionStorage.getItem("putt_user");
    //     setUsersName(userObj);
    //     return userObj;
    // }
    
    return (
        <>
            <div className="home__greeting">
                    <h2>Welcome  to Putt Tracker!</h2>
                    {/* <h3>What would you like to do today?</h3> */}
                    <div className="home__greeting__buttons">
                        <Link to={`/putt`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/putt`}>
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

