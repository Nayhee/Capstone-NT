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


    const {discId} = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        getDiscById(discId)
        .then(fetchedDisc => {
            setDisc(fetchedDisc);
            setIsLoading(false);
        })
    }, [discId])

    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
    }, [])

    useEffect(() => {
        getAllTypes()
        .then(allTypes => {
            setTypes(allTypes)
        })
    }, [])

    const handleFieldChange = (e) => {
        const stateToChange = {...disc }
        if(e.target.value.includes("Id")) {
            e.target.value = parseInt(e.target.value)
        }
        stateToChange[e.target.id] = e.target.value;
        setDisc(stateToChange);
    }

    const updateExistingDisc = (e) => {
        e.preventDefault()
        setIsLoading(true);
    
        const editedDisc = {
            id: discId,
            name: disc.name,
            weight: disc.weight,
            brandId: disc.brandId,
            typeId: disc.typeId
        };
        updateDisc(editedDisc).then(() => navigate("/discs"))
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
                        <label htmlFor="name">Name:</label>
                        <input
                        type="text"
                        id="name" 
                        className="form-controls"
                        onChange={handleFieldChange} 
                        required
                        autofocus
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
                        autofocus
                        maxLength="3"
                        value={disc.weight} />
                    </div>
                </fieldset>
                
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
