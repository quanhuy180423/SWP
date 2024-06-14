import PropTypes from 'prop-types';
import { faChartBar, faBlog, faComments, faClipboardList, faBox, faUser, faGem, faCube, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ onChangeContent }) => {
  const handleButtonClick = (content) => {
    onChangeContent(content);
  };

  return (
    <div className="h-screen bg-blue-100 text-black w-64 flex flex-col ">
      <ul className="flex-1 flex flex-col justify-center items-center fixed top-0 left-0 h-full bg-blue-100 text-black w-60 overflow-y-auto">
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Dashboard')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faChartBar} className="text-xl mr-2" />
            Dashboard
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Blog')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faBlog} className="text-xl mr-2" />
            Blog
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Chat')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faComments} className="text-xl mr-2" />
            Chat
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Order')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faClipboardList} className="text-xl mr-2" />
            Order
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('RequestOrder')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faClipboardList} className="text-xl mr-2" />
            Request Order
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Product')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faBox} className="text-xl mr-2" />
            Product
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Diamond')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faGem} className="text-xl mr-2" />
            Diamond
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Material')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faCube} className="text-xl mr-2" />
            Material
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Category')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faListAlt} className="text-xl mr-2" />
            Category
          </button>
        </li>
        <li className="mb-8 w-full">
          <button
            onClick={() => handleButtonClick('Account')}
            className="text-black flex items-center justify-center w-full py-2 hover:bg-blue-300"
          >
            <FontAwesomeIcon icon={faUser} className="text-xl mr-2" />
            Account
          </button>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  onChangeContent: PropTypes.func.isRequired,
};

export default Sidebar;
