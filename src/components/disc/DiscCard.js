import React from "react"
import "./Disc.css"
import { Link } from "react-router-dom";

export const DiscCard = ({ disc, handleDeleteDisc }) => {
    return (
      <div className="card-disc">
        <div className="card-disc-content">
          <div className="image_div">
              <img src={disc.image} alt="My Disc" />
          </div>
          <h3><span className="card-disc-name">
            {disc.name}
          </span></h3>
          <p>Type: {disc.type}</p>
          <p>Weight: {disc.weight}</p>
          <Link to={`/discs/${disc.id}/edit`}>
              <button>Edit</button>
          </Link>
          <button type="button" onClick={()=> handleDeleteDisc(disc.id)}>Delete</button>
        </div>
      </div>
    );
  }