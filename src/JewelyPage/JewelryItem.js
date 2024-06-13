import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JewelryItem = ({
  to,
  firstImage,
  title,
  material,
  gem,
  productCost,
  Description, // Corrected typo here
}) => {
  JewelryItem.propTypes = {
    to: PropTypes.string.isRequired,
    firstImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    gem: PropTypes.string.isRequired,
    productCost: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired, // Corrected prop name here
  };
  return (
    <Link to={to} className="m-2 border">
      <img
        src={firstImage}
        alt={title}
        className="w-96 h-96"
        // Removed unused mouse enter/leave handlers
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
      <h3 className="text-xl font-bold">{title}</h3>
      <p>Material: {material}</p>
      <p>Gem: {gem}</p>
      <p>Cost: {productCost}</p>
      <p>{Description}</p> {/* Corrected prop name here */}
    </Link>
  );
};

export default JewelryItem;
