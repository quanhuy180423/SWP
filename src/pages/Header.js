// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
// import { NavLink } from 'react-router-dom';
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Header.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // const handleSearch = () => {
  //   onSearch(query);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  return (
    <header className={`header`}>
      <div className="top-bar">
        <div className="logo-header">
          <Link to={"/"}>
            <img src="./logo.png" alt="logo cua hang" className="logo" />
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            // onKeyPress={handleKeyPress}
            placeholder="Search..."
          />
          {/* //onClick={handleSearch} */}
          <button>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
              alt="search-icon"
            />
          </button>
        </div>

        <div className="auth-links">
          <div className="header-login-registration">
            <Link to="/login">Sign in/</Link>
            <Link to="/register">Sign up</Link>
          </div>
          <div className="divider"></div>
          <div>
            <Link to="/booking">
              Booking requirement <FontAwesomeIcon icon={faFileInvoice} />{" "}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="nav">
        <nav className="navbar">
          <Link to="/da-quy" className="nav-link">
            Đá quý
          </Link>
          <Link to="/da-quy" className="nav-link">
            Kim Cương
          </Link>
          <Link to="/trang-suc" className="nav-link">
            Trang sức
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
