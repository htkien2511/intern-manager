import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { getAuth } from "../../utils/helpers";
import { ROUTE_LOGIN } from "../../utils/routes";
import DropdownUserMenu from "../common/DropdownUserMenu";

function Header({ showLogo }) {
  const auth = getAuth();

  return (
    <div className="header">
      <div className="header__inner flex items-center space-between">
        {
          !showLogo ? (
            <div className="header__inner__title">Admin page</div>
          )
            :
            <NavLink to="/" className="header__inner__logo">
              <img src={logo} alt="Logo" />
            </NavLink>
        }
        <div className="header__inner__menu flex items-center">
          {showLogo && (
            <>
              <i className="fi-rr-home"></i>
              <NavLink activeClassName="--active" to="/" exact>
                <span>Home page</span>
              </NavLink>
            </>
          )}
          {auth && auth.token ? <DropdownUserMenu auth={auth} /> : (
            <NavLink activeClassName="--active" to={ROUTE_LOGIN}>
              <button className="button button--login">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
