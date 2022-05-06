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
    
    //set initial blank state for the round users will fill out. 
    const [round, setRound ] = useState({
        userId: currentUserId,
        date: dateFunc(),
        discId: 0
    })
    //set initial blank state for the todayScorecard that will populate AFTER they record a round TODAY. 
    const [todayScorecard, setTodayScorecard] = useState({
        totalPutts: 0,
        totalMade: 0,
        puttingPercentage: ""
    })

    //state for fetchnig users discs for the Select dropdown. 
    const [discs, setDiscs] = useState([])
    //state to stop user from repeatedly clicking submit and overloading database with requests. 
    const [isLoading, setIsLoading] = useState(true)

    //set initial border state to the normal class so that I can change its class to Cool border when user submits. 
    const [border, setBorder] = useState("newRoundForm")
    //use isButton's state for my ScoreCard Calc, so that it runs everytime the button's state is changed (clicked).
    const [isButton, setIsButton] = useState(false)


    //fetch the users discs for the select dropdown. once retrieved, setIsLoading to false. 
    useEffect(() => {
        getAUsersDiscs(currentUserId)
        .then(usersDiscs => {
            setDiscs(usersDiscs)
        })
        setIsLoading(false);
    }, [])

    //Goal: calculate the scorecard values BUT DON'T POPULATE SCORECARD ON DOM UNTIL THEY'VE TRACKED A ROUND TODAY. 
    //get the users rounds.
    //filter only rounds that were recorded today. 
    // set totalPutts and TotalMade tot 0, then loop through each round (obj) in the array, and add that rounds 
    // total putts and total made to the Count. 
    //calculate percentage. if NotANumber set as empty string to avoid harsh presentation. 
    //create new object with the values calculated and SET the new object. 
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

    //runs everytime the isButton state is changed. 
    //basically, isButton starts as false, then once button is cliked it changes to true, which triggers the scorecard 
    //to run now that user has submitted a round today. 
    useEffect(() => {
        scorecardCalc();
    }, [isButton])


    //create copy of current state. Grab the user's input value.
    //set the value of the newRound using bracket notation.
    //update state to reflect the new round.
    const handleControlledInputChange = (event) => {
        const newRound = {...round}
        let userInputValue = event.target.value;
        if(event.target.value.includes("Id")) {
                userInputValue = parseInt(userInputValue)
            }
        newRound[event.target.id] = userInputValue;
        setRound(newRound);
    }

     //borderFunc used to get the Animated Gradient Border to flash when user first submits a round!
    const borderFunc = () => {
        if(border === "newRoundForm") {
            setBorder("newRoundFormBorderFlash")
        }
    }

    const integerCheck = (evt) => {
        const newRound = {...round}
        newRound.discId = parseInt(evt.target.value);
        setRound(newRound);
    }


    const handleClickSaveRound = (event) => {
        event.preventDefault();

        //when the submit a round, confirm that all 4 fields were rightfully filled out. 
        if(round.discId !== 0 && round.distance > 0 && round.putts > 0 && round.made > 0) {
            setIsLoading(true);
            
            //if they submit a full round, I invert the IsButton state, so that the scorecard calculation 
            //runs again, updating it with the new round's data.
            setIsButton(!isButton)
            //swich the border class everytime submit round button clicked. 
            borderFunc();
            
            round.putts = parseInt(round.putts);
            round.made = parseInt(round.made);
            round.distance = parseInt(round.distance);
            
            //send round to DB then 
            addRound(round)
            .then(() => scorecardCalc())
            .then(setIsLoading(false))
        } else {
            window.alert("Please complete each field")
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            
            <div className='howToPlayDiv'>
            {/* <div className={todayScorecard.totalPutts < 1 ? 'howToPlayDiv' : 'invisibleTwo'}> */}
                <h4>How It Works:</h4>
                <ol> 
                    <li className="howToPlayItem">Throw some putts</li>
                    <li className="howToPlayItem">Input your results</li>
                    <li className="howToPlayItem">Click submit round</li>
                </ol>
            </div>
            
            
            
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
                        <select value={round.discId} name="discId" id="discId" onChange={integerCheck} className="newRoundControls">
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