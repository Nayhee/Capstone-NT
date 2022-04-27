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
        return `mm/dd/yyyy`
    }
    
    const [round, setRound ] = useState({
        userId: currentUserId,
        date: dateFunc(),
        discId: 0,
        distance: "",
        putts: "",
        made: ""
    })

    const [discs, setDiscs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    
    useEffect(() => {
        getAUsersDiscs(currentUserId)
        .then(usersDiscs => {
            setDiscs(usersDiscs)
        })
        setIsLoading(false);
    }, [])
    
    //for the summary, I will want to getAUsersRounds then filter for rounds that match today.
    //maybe split the date by /, and then compare 0 and 1 to todays date. If they match, sum them and display on DOM.

    const handleControlledInputChange = (event) => {
        const newRound = {...round}
        let userInputValue = event.target.value;
        if(event.target.value.includes("Id")) {
            userInputValue = parseInt(userInputValue)
        }
        newRound[event.target.id] = userInputValue;
        setRound(newRound);
    }

    const handleClickSaveRound = (event) => {
        event.preventDefault();

        if(round.discId !== 0 && round.distance !== "" && round.putts !== "" && round.made !== "") {
            setIsLoading(true);
            addRound(round)
            .then(() => navigate("/rounds"))
        } else {
            window.alert("Please complete each field")
        }
    }


    return (
        <main style={{ textAlign: "center" }}>

            <form className="newRoundForm">
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
                        placeholder="Distance"
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
                        placeholder="# Putts"
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
                        placeholder="# Made"
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