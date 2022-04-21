import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addDisc, getAUsersDiscs } from "../../modules/DiscManager";
import './DiscForm.css'


//set blank disc form as state. 
//IsLoading to true initially. 

//fetch all of the users discs, set the state so the dropdown populates. 
//handleInputChange function that takes each key and changes state to put it on the page. 
//upon submit, immedietel setIsLoading to true, and then add the disc to DB 

export const DiscForm = () => {
    
    const [disc, setDisc] = useState({
        name: "",
        type: "",
        weight: "",
        image: 'd1.jpg'
    })
    
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    //create copy of current state. Grab the user's input value.
    //set the value of the newDisc using bracket notation.
    //update state to reflect the new animal. 
    const handleControlledInputChange = (event) => {
        const newDisc = {...disc}
        let userInputValue = event.target.value
        newDisc[event.target.id] = userInputValue;
        setDisc(newDisc);
    }

    const handleClickSaveDisc = (event) => {
        event.preventDefault();

        //WRITE SOME CODE TO CHECK AND MAKE SURE THE USER TYPED IN A 3DIGIT NUMBER FOLLOWED BY A G. (EX: 173g)

        //if all disc properties aren't null, setIsLoading to true, addDisc, then navigate to /discs. 
        if(disc.name !== "" && disc.type > 0 && disc.weight !== "") {
            setIsLoading(true);
            addDisc(disc)
            .then(() => navigate("/discs"))
        } else {
            window.alert("Please complete each field")
        }
    }

    return (
        <form className="discForm">
            <h2 className="discForm-title">New Disc</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Disc Name:</label>
                    <input className="form-control" type="text" id="name" onChange={handleControlledInputChange} maxlength="20" required autoFocus placeholder="Disc Name" value={disc.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Disc Weight:</label>
                    <input className="form-control" type="text" id="name" onChange={handleControlledInputChange} maxlength="4" required autoFocus placeholder="Disc weight in grams (ex: 173g)" value={disc.weight} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Disc Type:</label>
                    <select value={disc.type} name="type" id="type" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select A Disc Type</option>
                        <option value="1">Putter</option>
                        <option value="2">Mid-Range</option>
                        <option value="3">Fairway-Driver</option>
                        <option value="4">Distance-Driver</option>
                    </select>
                </div>
            </fieldset>
            <button 
                type="button"
                className="save-disc-button"
                disabled={isLoading}
                onClick={handleClickSaveDisc}>
                Save Disc
            </button>
        </form>
    )

}