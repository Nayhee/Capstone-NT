import React, { useEffect, useState } from "react"
import "./Round.css"
import { getAUsersRounds, deleteRound } from "../../modules/RoundManager"
import { useNavigate } from "react-router-dom"
import { RoundCard } from "./RoundCard"

export const RoundList = () => {
    const [rounds, setRounds] = useState([])
    
    const navigate = useNavigate();

    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'))
    const currentUserName = currentUser.firstName;
    const currentUserId = currentUser.id;

    const getRounds = (currentUserId) => {
        return getAUsersRounds(currentUserId).then(usersRounds => {
            setRounds(usersRounds)
        })
    }

    const handleDeleteRound = (id) => {
        deleteRound(id)
        .then(() => getAUsersRounds(currentUserId).then(setRounds))
    }

    useEffect(() => {
        getRounds(currentUserId)
    }, [])

    return (
        <>

            <div className="roundListContainer">

            <div className="roundListHeader">
                <div>
                    <h2>{currentUserName}'s Rounds</h2>
                </div>
                <div>
                    <button type="button"
                        className="newRoundButton"
                        onClick={() => {navigate("/rounds/create")}}>
                            New Round
                    </button>
                </div>
            </div>

                <div className="labelsAndListContainer">

                <div className="roundListLabels">
                    <div className="roundListLabel">Date:</div>
                    <div className="roundListLabel">Disc:</div>
                    <div className="roundListLabel">Distance:</div>
                    <div className="roundListLabel">Putts:</div>
                    <div className="roundListLabel">Made:</div>
                    <div className="roundListLabel"><b>Putting %</b></div>
                </div>
                    <div className="roundList">
                        {rounds.map(round => 
                            <RoundCard
                                key={round.id}
                                round={round}
                                handleDeleteRound={handleDeleteRound}
                            />)}
                    </div>
                </div>


            </div>
        </>
    )
}