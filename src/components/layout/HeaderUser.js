import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ROUTE_LOGIN } from "../../utils/routes";

function HeaderUser() {

    return (
        <div className="header">
            <div className="header__inner flex items-center space-between">
                <NavLink to="/" className="header__inner__logo">
                    <img src={logo} alt="Logo" />
                </NavLink>

                <div className="header__inner__menu flex items-center">
                    <NavLink activeClassName="--active" to="/" exact>
                        <span>Home page</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to="/infoIntern" exact>
                        <span>Profile</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to="/" exact>
                        <span>Đăng kí lịch</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to="/feedback" exact>
                        <span>Feedback</span>
                    </NavLink>
                    
                    <NavLink activeClassName="--active" to={ROUTE_LOGIN}>
                        <span>Login</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
export default HeaderUser;
