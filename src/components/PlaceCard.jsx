// components/PlaceCard.jsx
import React from "react";

const PlaceCard = ({ place }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{place.name}</h3>
      <p className="text-gray-600">{place.description}</p>
    </div>
  );
};

export default PlaceCard;
