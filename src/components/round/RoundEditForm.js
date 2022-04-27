import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {updateRound, getRoundById} from "../../modules/RoundManager"
import { getAUsersDiscs } from "../../modules/DiscManager"
import "./RoundForm.css"


export const RoundEditForm = () => {
    const [round, setRound] = useState({discId: "", distance: "", putts: "", made: "" });
    const [discs, setDiscs] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const {roundId} = useParams();
    const navigate = useNavigate();

     
    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUserId = currentUser.id;


    useEffect(() => {
        getRoundById(roundId)
        .then(fetchedRound => {
            setRound(fetchedRound);
            setIsLoading(false);
        })
    }, [roundId])

    useEffect(() => {
        getAUsersDiscs(currentUserId)
        .then(fetchedDiscs => {
            setDiscs(fetchedDiscs);
        })
    }, [])


    const handleFieldChange = (e) => {
        const stateToChange = {...round}
        if(e.target.value.includes("Id")) {
            e.target.value = parseInt(e.target.value)
        }
        stateToChange[e.target.id] = e.target.value;
        setRound(stateToChange);
    }

    const updateExistingRound = (e) => {
        e.preventDefault()
        setIsLoading(true);

        const editedRound = {
            id: roundId,
            discId: round.discId,
            distance: round.distance,
            putts: round.putts,
            made: round.made
        };
        updateRound(editedRound).then(() => navigate("/rounds"))
    }

    return (
        <>
        <main style={{ textAlign: "center" }}>

            <form className="roundForm">

                <h1 className="roundFormTitle">Edit Round</h1>
                <p className="roundFormDate"> Round Date: {round.date}</p>
                
                <div className="fieldsetDiv">
                    
                        <div className="roundFormGroup">
                            <label htmlFor="disc">Disc:</label>
                            <select value={round.discId} name="discId" id="discId" onChange={handleFieldChange} className="roundFormControls">
                                <option value="0" style={{ color: "#8e8e8e" }} >Select Disc</option>
                                {discs.map(d => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="roundFormGroup">
                            <label htmlFor="distance">Distance:</label>
                            <input
                            type="text"
                            id="distance" 
                            className="roundFormControls"
                            onChange={handleFieldChange} 
                            required
                            maxLength="3"
                            value={round.distance} />
                        </div>
                    
                        <div className="roundFormGroup">
                            <label htmlFor="putts">Putts:</label>
                            <input 
                            type="text"
                            id="putts" 
                            className="roundFormControls"
                            onChange={handleFieldChange} 
                            required
                            maxLength="3"
                            value={round.putts} />
                        </div>

                        <div className="roundFormGroup">
                            <label htmlFor="made">Made:</label>
                            <input 
                            type="text"
                            id="made" 
                            className="roundFormControls"
                            onChange={handleFieldChange} 
                            required
                            maxLength="3"
                            value={round.made} />
                        </div>
                    
                </div>

                <button 
                    type="button"
                    className="save-round-button"
                    disabled={isLoading}
                    onClick={updateExistingRound}>
                    Save Changes
                </button>

            </form>

        </main>
        </>
    )







}