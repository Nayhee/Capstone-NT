import React, { useEffect, useState } from "react";
import "./Disc.css"
import { getAllDiscs, updateDisc } from "../../modules/DiscManager";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";

export const DiscList = () => {

    const [discs, setDiscs] = useState([])
    
    const navigate = useNavigate();

    const getDiscs = () => {
        return getAllDiscs().then(discsFromAPI => {
            setDiscs(discsFromAPI)
        })
    }

    const handleDeleteDisc = (disc) => {
        updateDisc(disc)
        .then(() => getAllDiscs()
        .then(allDiscs => {
        setDiscs(allDiscs)
    }))
    }

    useEffect(() => {
        getDiscs();
    }, [])

    return (
        <>
            <section className="add__disc__container">
                <button type="button"
                    className="add__disc__button"
                    onClick={() => {navigate("/discs/create")}}>
                        Add New Disc
                    </button>
            </section>

            <div className="disc__list">
                {discs.map(disc =>
                    <DiscCard
                        key={disc.id}  //unique key for React to keep track of re-rendering only things that have changed. 
                        disc={disc}    //pass the disc object and its properties. 
                        handleDeleteDisc={handleDeleteDisc} //pass the func to child comp for the card's delete button. 
                    />)}
            </div>
        </>
    )

}