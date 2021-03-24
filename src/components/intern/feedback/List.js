import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_SEND_FEEDBACK, ROUTE_CONVERSATION } from "../../../utils/routes";
function List() {
    return (
        <div className="list">
            <h1>Intern's Feedbacks</h1>
            <div className="new__feedback">
                <NavLink activeClassName="--active" to={ROUTE_SEND_FEEDBACK}>
                    <button className="btn-new">
                        <i className="fi-rr-add"></i>
                    </button>
                </NavLink>
            </div>
            <div className="list_feedback">
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
                <div className="list-child">
                    <NavLink activeClassName="--active" to={ROUTE_CONVERSATION}>
                        <p>21/02/2021</p>
                        <h2>Information Intern</h2>
                    </NavLink>
                </div>
            </div>
        </div>


    );
}

export default List;
