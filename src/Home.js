import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import {getAUsersRounds} from "../src/modules/RoundManager"

export const Home = () => {
    
    const currentUser= JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUsersName = currentUser.firstName;
    const currentUsersId = currentUser.id;

    const [totalRounds, setTotalRounds] = useState();
    const [totalPutts, setTotalPutts] = useState();
    const [puttsMade, setPuttsMade] = useState();
    const [puttPercentage, setPuttPercentage] = useState();


    const decimalToPercentage = (decimal) => {
        let percent = decimal * 100;
        let rounded = Math.round(percent)
        return `${rounded}%`
    }

    useEffect(() => {
        getAUsersRounds(currentUsersId)
        .then(allRounds => {
            
            let roundCount = allRounds.length;
            setTotalRounds(roundCount);

            let puttCount = 0;
            allRounds.forEach(round => puttCount += round.putts)
            setTotalPutts(puttCount);

            let madeCount = 0;
            allRounds.forEach(round => madeCount += round.made)
            setPuttsMade(madeCount);

            let decimal = madeCount / puttCount;
            let percentage = decimalToPercentage(decimal)
            setPuttPercentage(percentage);
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
                            <div className="scorecardPercLabel">Putting %</div>
                            <div className="scorecardPercValue">{puttPercentage}</div>
                        </div>
                    </div>

                    <div className="home__container__buttons">
                        <Link to={`/discs`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/create/round`}>
                            <button>Start Putting</button>
                        </Link>
                        <Link to={`/rounds`}>
                            <button>My Rounds</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}

