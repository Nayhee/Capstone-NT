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
    
    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUserId = currentUser.id;

    const [disc, setDisc] = useState({
        name: "",
        type: "",
        brand: "",
        weight: "",
        image: "/images/d1.jpg",
        userId: currentUserId
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
        if(disc.name !== "" && disc.type !== 0 && disc.brand !== 0 && disc.weight !== "") {
            setIsLoading(true);
            addDisc(disc)
            .then(() => navigate("/discs"))
        } else {
            window.alert("Please complete each field")
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <form className="discForm">
                <h1 className="discFormTitle">New Disc</h1>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="brand">Brand:</label>
                        <select value={disc.brand} name="brand" id="brand" onChange={handleControlledInputChange} className="form-control">
                            <option value="0" style={{ color: "#8e8e8e" }} >Select Brand</option>
                            <option>Innova</option>
                            <option>Discraft</option>
                            <option>Dynamic Discs</option>
                            <option>Discmania</option>
                            <option>Prodigy</option>
                            <option>MVP</option>
                            <option>Axiom</option>
                            <option>Latitude 64</option>
                            <option>Westside</option>
                            <option>Kataplast</option>
                        </select>
                    </div>
                </fieldset>
                
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select value={disc.type} name="type" id="type" onChange={handleControlledInputChange} className="form-control">
                            <option value="0" style={{ color: "#8e8e8e" }} >Select Type</option>
                            <option>Putter</option>
                            <option>Mid-Range</option>
                            <option>Fairway-Driver</option>
                            <option>Distance-Driver</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input className="form-control" type="text" id="name" onChange={handleControlledInputChange} maxLength="20" required autoFocus placeholder="Disc Name" value={disc.name} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input className="form-control" type="text" id="weight" onChange={handleControlledInputChange} maxLength="4" required autoFocus placeholder="Ex: 173g" value={disc.weight} />
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

        </main>
    )

}