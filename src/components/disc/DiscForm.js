import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addDisc } from "../../modules/DiscManager";
import {getAllBrands} from "../../modules/BrandManager"
import {getAllTypes} from "../../modules/TypeManager"
import './DiscForm.css'


//set blank disc form as state. 
//IsLoading to true initially. 

//fetch all of the users discs, set the state so the dropdown populates. 
//handleInputChange function that takes each key and changes state to put it on the page. 
//upon submit, setIsLoading to true, and then add the disc to DB !

export const DiscForm = () => {
    
    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUserId = currentUser.id;

    const [disc, setDisc] = useState({
        name: "",
        weight: "",
        typeId: 0,
        brandId: 0,
        image: "/images/d2.png",
        userId: currentUserId
    })
    
    const [isLoading, setIsLoading] = useState(true)
    
    const navigate = useNavigate();
    
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])
    
    //after first render it fetches the brands and types for the select dropdown. once loaded, setIsLoading to false. 
    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
        getAllTypes()
        .then(allTypes => {
            setTypes(allTypes)
        })
        setIsLoading(false);
    }, [])
    
    //create copy of current state. Grab the user's input value.
    //set the value of the newDisc using bracket notation.
    //update state to reflect the new disc. 
    const handleControlledInputChange = (event) => {
        const newDisc = {...disc}
        let userInputValue = event.target.value;
        if(event.target.value.includes("Id")) {
            userInputValue = parseInt(userInputValue)
        }
        newDisc[event.target.id] = userInputValue;
        setDisc(newDisc);
    }

    const integerCheck = (evt) => {
        const newDisc = { ...disc }
        
        if(evt.target.id === "brandId") {
            newDisc.brandId = parseInt(evt.target.value)
        } else {
            newDisc.typeId = parseInt(evt.target.value)
        }
        setDisc(newDisc)
      }

    //User Input controls that makes sure all 3 values are numbers. 
    //if all are numbers, return true. 
    const checkUsersWeightInput = (weight) => {
        if(!isNaN(weight[0]) && !isNaN(weight[1]) && !isNaN(weight[2])) {
            return true;
        } else {
            return false;
        }
    }

    //On click of save buton, check if all 4 fields have a value. 
    //if they do, then calls my WeightFunc which checks all 3 values are numbers. 
    //if they are numbers, it sets the weight property, adds the disc, and takes user to DiscList. 
    const handleClickSaveDisc = (event) => {
        event.preventDefault();

        if(disc.name !== "" && disc.typeId !== 0 && disc.brandId !== 0 && disc.weight !== "") {
            
            if(checkUsersWeightInput(disc.weight)) {
                setIsLoading(true);
                disc.weight = `${disc.weight}g`
                addDisc(disc)
                .then(() => navigate("/discs"))
            } else {
                window.alert("Please input 3 numbers for Weight.")
            }
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
                        <select value={disc.brandId} name="brandId" id="brandId" onChange={integerCheck} className="form-controls">
                            <option value="0" style={{ color: "#8e8e8e" }} >Select Brand</option>
                            {brands.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select value={disc.typeId} name="typeId" id="typeId" onChange={integerCheck} className="form-controls">
                            <option value="0" style={{ color: "#8e8e8e" }} >Select Type</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input className="form-controls" type="text" id="name" onChange={handleControlledInputChange} maxLength="20" required autoFocus placeholder="Disc Name" value={disc.name} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input className="form-controls" type="text" id="weight" onChange={handleControlledInputChange} maxLength="3" required autoFocus placeholder="Ex: 173" value={disc.weight} />
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