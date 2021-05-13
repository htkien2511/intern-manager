import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setTitle } from "redux/actions/admin/setTitle";
import {
  ROUTE_MANAGE_ACCOUNT_WAITING,
  // ROUTE_MANAGE_FEEDBACK__INTERN,
  ROUTE_MANAGE_INTERN,
  ROUTE_MANAGE_LEADER,
  ROUTE_MANAGE_SCHEDULE,
  ROUTE_MANAGE_PROJECT,
  ROUTE_VIEW_STATISTIC,
} from "../../utils/routes";
import Logo from "assets/images/logoInternManage.png";
import { getAuth } from "utils/helpers";

function SideBar() {
  const dispatch = useDispatch();
  return (
    <div className="side-bar">
      <div className="side-bar__inner flex items-center space-between">
        <div className="side-bar__inner__items flex flex-col">
          <div className="side-bar__inner__items--logo flex items-center contents-center">
            {/* <span>SHAPEE CLOUND</span> */}
            <img src={Logo} alt="" style={{ width: 300, height: 95 }} />
          </div>
          <div className="side-bar__inner__items--menu">
            {getAuth().role === "ROLE_ADMIN" && (
              <div className="side-bar__inner__items--menu__item flex">
                <div className="temp"></div>
                <i className="fi-rr-user"></i>
                <NavLink
                  activeClassName="side-bar__inner__items--menu__item--active border-corner"
                  to={ROUTE_MANAGE_LEADER}
                  onClick={() => dispatch(setTitle("Manage Leader"))}
                >
                  Manage Leader
                </NavLink>
              </div>
            )}
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-user"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active"
                to={ROUTE_MANAGE_INTERN}
                onClick={() => dispatch(setTitle("Manage Intern"))}
              >
                Manage Intern
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-calendar"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_MANAGE_SCHEDULE}
                onClick={() => dispatch(setTitle("Manage Schedule Intern"))}
              >
                Manage Schedule Intern
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-list-check"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_MANAGE_PROJECT}
                onClick={() => dispatch(setTitle("Manage Project Intern"))}
              >
                Manage Project Intern
              </NavLink>
            </div>
            {/* <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-comment-alt" />
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_MANAGE_FEEDBACK__INTERN}
                onClick={() => dispatch(setTitle("Manage Feedback Intern"))}
              >
                Manage Feedback Intern
              </NavLink>
            </div> */}
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-hourglass-end"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_MANAGE_ACCOUNT_WAITING}
                onClick={() => dispatch(setTitle("Manage Account  Waiting"))}
              >
                Manage Account Waiting
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-stats"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_VIEW_STATISTIC}
                onClick={() => dispatch(setTitle("View statistics"))}
              >
                View statistics
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
