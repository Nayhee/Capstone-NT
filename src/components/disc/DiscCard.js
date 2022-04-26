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
          <h2><span className="card-disc-name">
            {disc.name}
          </span></h2>
          <p>Type: {disc.type.name}</p>
          <p>Weight: {disc.weight}</p>
          <p>Brand: {disc.brand.name}</p>
          
          <div className="editDeleteButtonsContainer">
            <Link to={`/discs/${disc.id}/edit`}>
                <button>Edit</button>
            </Link>
            <button type="button" onClick={()=> handleDeleteDisc(disc.id)}>Delete</button>
          </div>

        </div>
      </div>
    );
  }