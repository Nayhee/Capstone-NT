import React, { useEffect, useState } from "react";
import "./Disc.css"
import { getAUsersDiscs, updateDisc } from "../../modules/DiscManager";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";

export const DiscList = () => {

    const [discs, setDiscs] = useState([])
    
    const navigate = useNavigate();

    const currentUser = JSON.parse(sessionStorage.getItem('putt__user'));
    console.log(currentUser)

    const getDiscs = (currentUserId) => {
        return getAUsersDiscs(currentUserId).then(discsFromAPI => {
            setDiscs(discsFromAPI)
        })
    }

    const handleDeleteDisc = (disc) => {
        updateDisc(disc)
        .then(() => getAUsersDiscs()
        .then(allDiscs => {
        setDiscs(allDiscs)
    }))
    }

    useEffect(() => {
        getDiscs(currentUser);
    }, [])

    return (
        <>
            <section className="add-disc-container">
                <button type="button"
                    className="add-disc-button"
                    onClick={() => {navigate("/discs/create")}}>
                        Add New Disc
                    </button>
            </section>

            <div className="disc-list">
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