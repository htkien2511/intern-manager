import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_MANAGESCHEDULE } from "../../utils/routes";
function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__inner flex items-center space-between">
        <div className="side-bar__inner__items flex flex-col">
          <div className="side-bar__inner__items--logo flex items-center contents-center">
            {/* <i class="fi-rr-align-justify"></i> */}
            <span>SHAPEE CLOUND</span>
          </div>
          <div className="side-bar__inner__items--menu">
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-user"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
                to="/a"
              >
                Manage Leader
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-user"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active"
                to="/admin/manage-intern"
              >
                Manage Intern
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-calendar"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to={ROUTE_MANAGESCHEDULE}
              >
                Manage Schedule Intern
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-list-check"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to="/a"
              >
                Manage Task Intern
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-hourglass-end"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to="/a"
              >
                Manage Account Waiting
              </NavLink>
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              <div className="temp"></div>
              <i className="fi-rr-stats"></i>
              <NavLink
                activeClassName="side-bar__inner__items--menu__item--active border-corner"
                to="/a"
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
