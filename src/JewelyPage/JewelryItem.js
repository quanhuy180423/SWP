import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JewelryItem = ({
  to,
  firstImage,
  title,
  material,
  gem,
  productCost,
  description,
}) => {
  // Removed the unused 'hovered' state
  // const [hovered, setHovered] = useState(false);

  // Removed the unused mouse enter/leave handlers
  // const handleMouseEnter = () => setHovered(true);
  // const handleMouseLeave = () => setHovered(false);

  return (
    <Link to={to} className="m-2 border">
      <img
        src={firstImage}
        alt={title}
        className="w-96 h-96"
        // Removed the unused mouse enter/leave handlers
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
      <h3 className="text-xl font-bold">{title}</h3>
      <p>Material: {material}</p>
      <p>Gem: {gem}</p>
      <p>Cost: {productCost}</p>
      <p>{description}</p>
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
  description: PropTypes.string.isRequired,
};

export default JewelryItem;