import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./Navbar.scss";

/*
    This component will contain the links
    to navigate the entire app.

    This Componnent will be common in all Components
*/

const Navbar = () => {
  // useEffect(() => {
  //     firestore
  //       .collection("colle")
  //       .doc()
  //       .set({ s: "s" })
  //       .then(() => {})
  //       .catch((error) => console.error(error));
  //   }, []);

  return (
    <div className="navbar">
      <NavLink activeClassName="active-tab" to="/add-todo">
        New Item
      </NavLink>
      <NavLink activeClassName="active-tab" to="/all-todos">
        Todos
      </NavLink>
    </div>
  );
};

export default Navbar;
