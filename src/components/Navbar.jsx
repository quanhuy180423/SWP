
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Left-aligned content */}
          <ul className="flex items-center">
          <div className="flex items-center">
          <img src="./img/diamond.png" alt="logo" className="w-12 h-12" />
          <h3 className="text-2xl font-serif text-black pl-2 font-bold">Sun Shine</h3>
        </div>
          </ul>
          {/* Right-aligned content */}
          <div className="flex items-center">
            {/* Navbar Search */}
            <form className="hidden md:block mr-3">
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                  placeholder="Search"
                />
                <button className="absolute right-0 top-0 mt-2 mr-4">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                </button>
              </div>
            </form>
            {/* Dropdown Menu */}
            <div className="relative hidden md:block">
              <div className="ml-3 relative">
                {/* Dropdown button */}
                <button
                  onClick={toggleDropdown}
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <FontAwesomeIcon icon={faUser} className="text-white p-2" />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isDropdownOpen ? "" : "hidden"
                    }`}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    {/* Dropdown items */}
                    <a href="#!" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Settings
                    </a>
                    <a href="#!" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Activity Log
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="#!" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                aria-label="Toggle sidebar"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
