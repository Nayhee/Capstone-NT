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

    const getDiscs = (currentUserId) => {
        return getAUsersDiscs(currentUserId).then(usersDiscs => {
            setDiscs(usersDiscs)
        })
    }

    const handleDeleteDisc = (id) => {
        deleteDisc(id)
        .then(() => getAUsersDiscs(currentUserId).then(setDiscs))
    }

    useEffect(() => {
        getDiscs(currentUserId);
    }, [])

//for new user, maybe write a func that checks if user has any discs.
//if they don't, do a ternary that changes the classname of the add-disc-button
//and I can make the new class much bigger and put it in the middle of screen. 

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
                        key={disc.id}  //unique key for React to keep track of re-rendering only things that have changed. 
                        disc={disc}    //pass the disc object and its properties. 
                        handleDeleteDisc={handleDeleteDisc} //pass the func to child comp for the card's delete button. 
                    />)}
            </div>
        </>
    )

}