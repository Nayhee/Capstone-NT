import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addRound } from "../../modules/RoundManager";
import {getAUsersDiscs} from "../../modules/DiscManager"
import {getAUsersRounds} from "../../modules/RoundManager"
import './RoundForm.css'


export const RoundForm = () => {
   
    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUserId = currentUser.id;

    let dateFunc = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`
    }
    
    const [border, setBorder] = useState("newRoundForm")
    const [isButton, setIsButton] = useState(false)

    const [round, setRound ] = useState({
        userId: currentUserId,
        date: dateFunc(),
        discId: 0,
        distance: "",
        putts: 0,
        made: 0
    })

    const [todayScorecard, setTodayScorecard] = useState({
        totalPutts: 0,
        totalMade: 0,
        puttingPercentage: ""
    })

    const [discs, setDiscs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect(() => {
        getAUsersDiscs(currentUserId)
        .then(usersDiscs => {
            setDiscs(usersDiscs)
        })
        setIsLoading(false);
    }, [])

    const scorecardCalc = () => {
        getAUsersRounds(currentUserId)
        .then(usersRounds => {
            let todaysRounds =usersRounds.filter(round => round.date === dateFunc())
            let totalPutts = 0;
            let totalMade = 0;
            todaysRounds.forEach(round => totalPutts += parseInt(round.putts))
            todaysRounds.forEach(round => totalMade += parseInt(round.made))
            let percentage = totalMade / totalPutts;
            let puttingPercentage = (percentage.toFixed(2) * 100)
            if(isNaN(puttingPercentage)) {
                puttingPercentage = ""
            }


            let todayScorecardObj = {
                totalPutts: totalPutts,
                totalMade: totalMade,
                puttingPercentage: puttingPercentage
            }
            setTodayScorecard(todayScorecardObj);
        })
    }

    useEffect(() => {
        scorecardCalc();
    }, [isButton])

    //for the border, maybe onclick I toggle to a almost identical class that's the same 
    // but with a border animation thats 1second animation duration.

    const handleControlledInputChange = (event) => {
        const newRound = {...round}
        let userInputValue = event.target.value;
        if(event.target.value.includes("Id")) {
            userInputValue = parseInt(userInputValue)
        }
        newRound[event.target.id] = userInputValue;
        setRound(newRound);
    }

    const borderFunc = () => {

        if(border === "newRoundForm") {
            setBorder("newRoundFormBorderFlash")
        } else {
            setBorder("newRoundForm")

        }
    }


    const handleClickSaveRound = (event) => {
        event.preventDefault();

        if(round.discId !== 0 && round.distance !== "" && round.putts > 0 && round.made > 0) {
            setIsLoading(true);
            
            setIsButton(!isButton)

            borderFunc();
            
            round.putts = parseInt(round.putts);
            round.made = parseInt(round.made);
            
            addRound(round)
            .then(() => scorecardCalc())
            .then(() => borderFunc())
            .then(setIsLoading(false))
        } else {
            window.alert("Please complete each field")
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <div className={todayScorecard.totalPutts > 0 ? 'todayScorecard' : 'invisible'}>
                
                <h2 className="todayScHeader">Today's Scorecard:</h2>

                <div className="todayScDataDiv">
                    <div className="todayScGroup">
                        <label htmlFor="todayScPutts"># Putts</label>
                        <div className="todayScValues"> {todayScorecard.totalPutts} </div>
                    </div>

                    <div className="todayScGroup">
                        <label htmlFor="todayScMade"># Made</label>
                        <div className="todayScValues"> {todayScorecard.totalMade} </div>
                    </div>

                    <div className="todayScGroup">
                        <label htmlFor="todayScPercentage">% Made</label>
                        <div className="todayScValues">{todayScorecard.puttingPercentage}%</div>
                    </div>
                </div>

               
            </div>
            
            <form className={border}>
                <h1 className="newRoundFormTitle">Track New Round</h1>

                <div className="newRoundGridDiv">

                    <div className="newRoundGroup">
                        <label htmlFor="discId">Disc:</label>
                        <select value={round.discId} name="discId" id="discId" onChange={handleControlledInputChange} className="newRoundControls">
                            <option value="0" style={{ color: "#8e8e8e" }} >Select Disc</option>
                            {discs.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="newRoundGroup">
                        <label htmlFor="distance">Distance:</label>
                        <input
                        type="text"
                        id="distance" 
                        className="newRoundControls"
                        onChange={handleControlledInputChange} 
                        required
                        maxLength="3"
                        placeholder="20"
                        value={round.distance} />
                    </div>

                    <div className="newRoundGroup">
                        <label htmlFor="putts"># Putts:</label>
                        <input
                        type="text"
                        id="putts" 
                        className="newRoundControls"
                        onChange={handleControlledInputChange} 
                        required
                        maxLength="3"
                        placeholder="10"
                        value={round.putts} />
                    </div>

                    <div className="newRoundGroup">
                        <label htmlFor="made"># Made:</label>
                        <input
                        type="text"
                        id="made" 
                        className="newRoundControls"
                        onChange={handleControlledInputChange} 
                        required
                        maxLength="3"
                        placeholder="8"
                        value={round.made} />
                    </div>

                </div>

                <button 
                type="button"
                className="submitRoundButton"
                disabled={isLoading}
                onClick={handleClickSaveRound}>
                    Submit Round
                </button>

            </form>

        </main>
    )
}