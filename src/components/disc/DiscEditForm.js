import React, { useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom"
import {updateDisc, getDiscById} from "../../modules/DiscManager"
import {getAllBrands} from "../../modules/BrandManager"
import {getAllTypes} from "../../modules/TypeManager"
import "./DiscForm.css"

export const DiscEditForm = () => {
    const [disc, setDisc] = useState({ name: "", weight: ""})
    const [isLoading, setIsLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

    //useParams holds the DiscId that AppViews uses in the Route!
    const {discId} = useParams(); 
    const navigate = useNavigate();

    //after first render, fetch the Disc, SET it, then change the state of IsLoading to false. 
    useEffect(() => {
        getDiscById(discId)
        .then(fetchedDisc => {
            setDisc(fetchedDisc);
            setIsLoading(false);
        })
    }, [discId])

    //fetch All Brands to use in DropDown menu of Edit Disc. 
    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
    }, [])
    //fetch All Types to use in Select Dropdown. 
    useEffect(() => {
        getAllTypes()
        .then(allTypes => {
            setTypes(allTypes)
        })
    }, [])


    //when a select value is changed, or a user inputs anything,
    //make copy of state, set valuue of new new Disc using bracket notation, then SET the updated disc.
    //basically tells the computer what the user input and where and then forces it to-render the DOM so that user see's their change.  
    const handleFieldChange = (e) => {
        const stateToChange = {...disc }
        if(e.target.value.includes("Id")) {
            e.target.value = parseInt(e.target.value)
        }
        stateToChange[e.target.id] = e.target.value;
        setDisc(stateToChange);
    }
    //function for error handling
    const checkUsersWeightInput = (weight) => {
        if(!isNaN(weight[0]) && !isNaN(weight[1]) && !isNaN(weight[2])) {
            return true;
        } else {
            return false;
        }
    }

    //function for when user clicks Save button. 
    //Sets isLoading to true so they can't click it again.
    //then creates the new disc object grabbing the users changes, and passes the Edited Disc to the "Update Disc" fetch call. 
    const updateExistingDisc = (e) => {
        e.preventDefault()
        
        if(checkUsersWeightInput(disc.weight)) {
            setIsLoading(true);
            disc.weight =  `${disc.weight}g`

            const editedDisc = {
                id: discId,
                name: disc.name,
                weight: disc.weight,
                brandId: disc.brandId,
                typeId: disc.typeId
            };
            updateDisc(editedDisc).then(() => navigate("/discs"))

        } else {
            window.alert("Please input 3 numbers for Weight.")
        }

    }

    return (
        <>
        <main style={{ textAlign: "center" }}>

            <form className="discForm">

                <div className="titleAndImages">
                    <h1 className="discFormTitle">Edit Disc</h1>
                    <img src={disc.image} alt="disc image"/>
                </div>
                
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="brand">Brand:</label>
                        <select value={disc.brandId} name="brandId" id="brandId" onChange={handleFieldChange} className="form-controls">
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
                        <select value={disc.typeId} name="typeId" id="typeId" onChange={handleFieldChange} className="form-controls">
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
                        <input
                        type="text"
                        id="name" 
                        className="form-controls"
                        onChange={handleFieldChange} 
                        required
                        autoFocus
                        maxLength="20"
                        value={disc.name} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input 
                        type="text"
                        id="weight" 
                        className="form-controls"
                        onChange={handleFieldChange} 
                        required
                        autoFocus
                        maxLength="3"
                        value={disc.weight} />
                    </div>
                </fieldset>

                <button 
                    type="button"
                    className="save-disc-button"
                    disabled={isLoading}
                    onClick={updateExistingDisc}>
                    Save
                </button>

            </form>

        </main>
        </>
    )

}
