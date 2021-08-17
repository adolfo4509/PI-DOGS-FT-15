import React from "react";
import "./cards.css";

export default function Card({ name, image, temperament }) {
  return (
    <div className="breads_cards">
      <h4>Raza: {name}</h4>

      <h4>Temperamento: {temperament}</h4>
      <img className="image" src={image} alt=" img not found" />
    </div>
  );
}
