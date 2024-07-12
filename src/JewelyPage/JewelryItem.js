// JewelryItem.js
import React from "react";
import { Link } from "react-router-dom";

const JewelryItem = ({ to, firstImage, title, material, gem, productCost }) => {
  return (
    <div className="jewelry-item">
      <Link to={to}>
        <img
          src={firstImage}
          alt={title}
          style={{ width: "350px", height: "350px", objectFit: "cover" }}
        />
        <h2 style={{ fontSize: "35px", fontWeight: "bold" }}>{title}</h2>
        <p>Material:{material}</p>
        <p>Gem: {gem}</p>
        <p style={{ fontWeight: "bold" }}>Price: {productCost}</p>
      </Link>
    </div>
  );
};

export default JewelryItem;
