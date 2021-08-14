import React from "react";

export default function Card({ name, image, temperament }) {
  return (
    <div className="breads_cards">
      <h2>{name}</h2>
      <h3>{temperament}</h3>
      <img className="image" src={image} alt="img not found" />
    </div>
  );
}
