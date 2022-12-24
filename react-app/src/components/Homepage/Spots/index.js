import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

function AllSpots() {
  const spots = Object.values(useSelector((state) => state.spots.allSpots));

  return (
    <div className="main-inner">
      <div className="grid">
        {spots.map((spot) => (
          <div key={spot.id}>
            <div className="grid-column">
              <div className="flex one-spot">
                <div className="mb-12">
                  <img
                    className="one-spot-img"
                    src={spot.preview_img}
                    alt="spot"
                  />
                </div>
                <div className="flex start">
                  <div className="flex-column left">
                    <div className="location">
                      {spot.city}, {spot.state}
                    </div>
                    <div className="name">{spot.name}</div>
                    <div className="date"></div>
                    <div className="price">${spot.price} night</div>
                  </div>
                  <div className="flex right">rating</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSpots;