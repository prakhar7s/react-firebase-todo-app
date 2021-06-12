import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./Navbar.scss";

/*
    This component will contain the links
    to navigate the entire app.

    This Componnent will be common in all Components
*/

const Navbar = () => {
  const resultsContainer = useRef();

  const showSearchedResults = () => {
    console.log("Hello");
  };

  return (
    <div className="navbar">
      <NavLink activeClassName="active-tab" to="/add-todo">
        New Item
      </NavLink>
      <NavLink activeClassName="active-tab" to="/all-todos">
        Todos
      </NavLink>
      <form>
        <input type="search" onFocus={showSearchedResults} />
      </form>

      <div ref={resultsContainer} className="search-results-container">
        <div className="search-results">sdadsasd</div>
      </div>
    </div>
  );
};

export default Navbar;
