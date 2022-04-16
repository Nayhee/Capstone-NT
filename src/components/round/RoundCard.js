import React from "react"
import "./Round.css"
import { Link } from "react-router-dom";

//will generate a roundCard. Passed: a round as a parameter 
export const RoundCard = ({ round, handleDeleteRound }) => {
    return (
      <div className="card">
        <div className="card-content">
          <h3>Date: <span className="card-rounddate">
            {round.date}
          </span></h3>
          <p>Putter: {round.disc}</p>
          <Link to={`/rounds/${round.id}`}>
            <button>Details</button>
          </Link>
          <Link to={`/rounds/${round.id}/edit`}>
              <button>Edit</button>
          </Link>
          <button type="button" onClick={()=> handleDeleteRound(round.id)}>Delete Round</button>
        </div>
      </div>
    );
  }