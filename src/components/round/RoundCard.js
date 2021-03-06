import React from "react"
import "./Round.css"
import { Link } from "react-router-dom";

export const RoundCard = ({ round, handleDeleteRound }) => {
    
    const decimalPuttPercentage = round.made / round.putts;
    let twoDec = decimalPuttPercentage.toFixed(2);
    const puttPercentage = twoDec * 100;
 

    return (
      <div className="roundContainer">

          <div className="roundRow">{round.date} </div>
          <div className="roundRow">
              <img src={round.disc.image}></img>
          </div>
          <div className="roundRow">{round.distance}ft </div>
          <div className="roundRow">{round.putts} </div>
          <div className="roundRow">{round.made} </div>
          <div className="roundRow"><b>{puttPercentage}%</b></div>

          <div className="roundEditButton">
              <Link to={`/rounds/${round.id}/edit`}>
                  <button>Edit</button>
              </Link>
              <button type="button" onClick={()=> handleDeleteRound(round.id)}>Delete</button>
          </div>

      </div>
    );
  }