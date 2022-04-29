import React, { useEffect, useState } from "react";
import "./Disc.css"
import { getAUsersDiscs, deleteDisc } from "../../modules/DiscManager";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";

export const DiscList = () => {

    const [discs, setDiscs] = useState([])
    
    const navigate = useNavigate();

    const currentUser = JSON.parse(sessionStorage.getItem('putt_user'))
    const currentUserId = currentUser.id;

    //get the users discs and SET the state. called by UseEffect every render AFTER the first. 
    const getDiscs = (currentUserId) => {
        return getAUsersDiscs(currentUserId).then(usersDiscs => {
            setDiscs(usersDiscs)
        })
    }

    const handleDeleteDisc = (id) => {
        deleteDisc(id)
        .then(() => getAUsersDiscs(currentUserId).then(setDiscs))
    }

    //gets the users discs every render AFTER the first render.
    useEffect(() => {
        getDiscs(currentUserId);
    }, [])


    //Ternary statement that checks if the user has any discs. If they don't, it only shows a HUGE "Add Disc" button 
    //in the middle of the page, instead of an empty list.  

    return (
        <>
            <section className="add-disc-container"> 
                <button type="button"
                    className={discs.length > 0 ? 'add-disc-button' : 'addDiscButton'}
                    onClick={() => {navigate("/discs/create")}}>
                        Add Disc
                    </button>
            </section>

            <div className="disc-list">
                {discs.map(disc =>
                    <DiscCard
                        key={disc.id}  //unique key for React to keep track of items and to re-render only things that have changed. 
                        disc={disc}    //pass the disc object and its properties to child component (discCard) 
                        handleDeleteDisc={handleDeleteDisc} //pass the delete func to child comp for the card's delete button. 
                    />)}
            </div>
        </>
    )

}