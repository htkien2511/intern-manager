import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ROUTE_PROFILE, ROUTE_FEEDBACKS, ROUTE_REGISTER_SCHEDULE, ROUTE_TASK_MANAGEMENT } from "../../utils/routes";
import DropdownUserMenu from "../common/DropdownUserMenu";

function HeaderUser() {

    return (
        <div className="header">
            <div className="header__inner flex items-center space-between">
                <NavLink to="/" className="header__inner__logo">
                    <img src={logo} alt="Logo" />
                </NavLink>

                <div className="header__inner__menu flex items-center">

                    <NavLink activeClassName="--active" to={ROUTE_PROFILE} exact>
                        <span>Profile</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT} exact>
                        <span>Task Management</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to={ROUTE_REGISTER_SCHEDULE} exact>
                        <span>Register Schedule</span>
                    </NavLink>

                    <NavLink activeClassName="--active" to={ROUTE_FEEDBACKS} exact>
                        <span>Feedback</span>
                    </NavLink>
        
                    <DropdownUserMenu />
                </div>
            </div>
        </div>
    );
}
export default HeaderUser;
