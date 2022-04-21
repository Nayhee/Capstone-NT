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
        image: "",
        type: "",
        weight: ""
    })
    
    const [isLoading, setIsLoading] = useState(true)

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

}