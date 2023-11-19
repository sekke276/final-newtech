import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { AuthContext } from "../Context/AuthContext";

function Header() {
  const [menutoggle, setMenutoggle] = useState(false);
  const { state } = useContext(AuthContext);

  console.log(state, "aa");
  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };

  const closeMenu = () => {
    setMenutoggle(false);
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <Link to="/">
          <a href="#home">LIBRARY</a>
        </Link>
      </div>
      <div className="nav-right">
        <ul className={menutoggle ? "nav-options active" : "nav-options"}>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          ></li>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            <Link to="/books">
              <a href="#books">Books</a>
            </Link>
          </li>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            <Link to="/signin">
              <a href="signin">Login</a>
            </Link>
          </li>
        </ul>
      </div>

      <div
        className="mobile-menu"
        onClick={() => {
          Toggle();
        }}
      >
        {menutoggle ? (
          <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
        )}
      </div>
    </div>
  );
}

export default Header;
