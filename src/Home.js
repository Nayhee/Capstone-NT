import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import {getAUsersRounds} from "../src/modules/RoundManager"

export const Home = () => {
    
    //need usersId to fetch their rounds, and need their first name to display on Scorecard. 
    const currentUser= JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUsersName = currentUser.firstName;
    const currentUsersId = currentUser.id;

    //set Initial blank state's of 4 pieces of the Scorecard. 
    const [totalRounds, setTotalRounds] = useState();
    const [totalPutts, setTotalPutts] = useState();
    const [puttsMade, setPuttsMade] = useState();
    const [puttPercentage, setPuttPercentage] = useState();

    //helper function to turn decimal into a percentage.
    const decimalToPercentage = (decimal) => {
        let percent = decimal * 100;
        return Math.round(percent);
    }

    //after first blank render, fetch the users rounds
    //then calculate the 
    useEffect(() => {
        getAUsersRounds(currentUsersId)
        .then(allRounds => {
            
            //# of total rounds is number of objects in the fetched "AllRounds" array. Set state.  
            let roundCount = allRounds.length;
            setTotalRounds(roundCount);

            //set puttCount to 0, then for each round, add that round's number of putts to the count and SET state. 
            let puttCount = 0;
            allRounds.forEach(round => puttCount += round.putts)
            setTotalPutts(puttCount);

            //set madeCount to 0, then for each round, add that round's number of made putts to the count and SET State. 
            let madeCount = 0;
            allRounds.forEach(round => madeCount += round.made)
            setPuttsMade(madeCount);

            let decimal = madeCount / puttCount;
            //New Users have no rounds, which returns NaN, SO, I solve by initally placing a userfriendly placeholder on the DOM.  
            let percentage = decimalToPercentage(decimal)
            if(isNaN(percentage)) {
                setPuttPercentage("-")
            } else {
                setPuttPercentage(`${percentage}%`)
            }
        })
    }, [])

    return (
        <>
            <div className="home__container">

                    <div className="userScorecard">
                        <h3>{currentUsersName}'s Scorecard</h3>
                        <div className="wrapper">
                            <div className="scorecardItem">Total Rounds:</div>
                            <div className="scorecardItem">{totalRounds}</div>
                            <div className="scorecardItem">Total Putts:</div>
                            <div className="scorecardItem">{totalPutts}</div>
                            <div className="scorecardItem">Putts Made:</div>
                            <div className="scorecardItem">{puttsMade}</div>
                            <div className="scorecardPercLabel">% Made</div>
                            <div className="scorecardPercValue">{puttPercentage}</div>
                        </div>
                    </div>

                    <div className="home__container__buttons">
                        <Link to={`/discs`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/rounds/create`}>
                            <button>Start Tracking</button>
                        </Link>
                        <Link to={`/rounds`}>
                            <button>My Rounds</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}

