import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_CONVERSATION, ROUTE_FEEDBACKS, ROUTE_REGISTER_SCHEDULE, ROUTE_TASK_MANAGEMENT, ROUTE_SEND_FEEDBACK } from "../../utils/routes";

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
                    
                    <NavLink activeClassName="--active" to={ROUTE_LOGIN}>
                        <span>Login</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
export default HeaderUser;
