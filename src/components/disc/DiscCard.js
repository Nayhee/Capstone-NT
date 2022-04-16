import React from "react"
import "./Disc.css"
import { Link } from "react-router-dom";

export const DiscCard = ({ disc, handleDeleteDisc }) => {
    return (
      <div className="card">
        <div className="card-content">
          <picture>
              <img src={disc.image} alt="My Disc" />
            </picture>
          <h3>Name: <span className="card-discname">
            {disc.name}
          </span></h3>
          <p>Type: {disc.type}</p>
          <p>Type: {disc.weight}</p>
          <Link to={`/discs/${disc.id}/edit`}>
              <button>Edit</button>
          </Link>
          <button type="button" onClick={()=> handleDeleteDisc(disc.id)}>Delete Disc</button>
        </div>
      </div>
    );
  }