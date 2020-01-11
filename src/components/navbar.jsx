import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Vidly
      </Link>

      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>

          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
