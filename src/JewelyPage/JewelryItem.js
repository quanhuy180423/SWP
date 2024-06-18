// JewelryItem.js
import React from "react";
import { Link } from "react-router-dom";

const JewelryItem = ({ to, firstImage, title, material, gem, productCost }) => {
  return (
    <div className="jewelry-item">
      <Link to={to}>
        <img src={firstImage} alt={title} />
        <h2>{title}</h2>
        <p>{material}</p>
        <p>{gem}</p>
        <p>{productCost}</p>
      </Link>
    </div>
  );
};

export default JewelryItem;
