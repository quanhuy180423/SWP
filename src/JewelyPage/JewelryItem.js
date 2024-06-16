import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JewelryItem = ({
  to,
  firstImage,
  title,
  material,
  gem,
  productCost,
  description, // Ensure correct prop name
}) => {
  return (
    <Link to={to} className="m-2 border">
      <img src={firstImage} alt={title} className="w-96 h-96" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p>Material: {material}</p>
      <p>Gem: {gem}</p>
      <p>Cost: {productCost}</p>
      {/* <p>{description}</p> Ensure correct prop name */}
    </Link>
  );
};

JewelryItem.propTypes = {
  to: PropTypes.string.isRequired,
  firstImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  material: PropTypes.string.isRequired,
  gem: PropTypes.string.isRequired,
  productCost: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // Ensure correct prop name
};

export default JewelryItem;
