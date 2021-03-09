import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ROUTE_LOGIN } from "../../utils/routes";

function SideBar() {

    return (
        <div className="side-bar">
            <div className="header__inner flex items-center space-between">
                <NavLink to="/" className="header__inner__logo">
                    <img src={logo} alt="Logo" />
                </NavLink>

                <div className="header__inner__menu flex items-center">
                    <NavLink activeClassName="--active" to={ROUTE_LOGIN}>
                        <button className="button button--login">Login</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
export default SideBar;
