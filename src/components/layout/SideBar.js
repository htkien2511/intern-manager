import React from "react";
import { NavLink } from "react-router-dom";
import leaderImage from "../../assets/images/manager.png";

function SideBar() {
    return (
        <div className="side-bar">
            <div className="side-bar__inner flex items-center space-between">
                <div className="side-bar__inner__items flex flex-col">
                    <div className="side-bar__inner__items--logo flex items-center contents-center">
                        <span>SHAPEE CLOUND</span>
                    </div>
                    <div className="side-bar__inner__items--menu">
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>
                            <img src={leaderImage} alt="" />
                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
                                to="/a"
                            >
                                Manage Leader
              </NavLink>
                        </div>
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>

                            <img src={leaderImage} alt="" />
                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item--active"
                                to="/admin/manage-intern"
                            >
                                Manage Intern
              </NavLink>
                        </div>
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>

                            <img src={leaderImage} alt="" />

                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
                                to="/a"
                            >
                                Manage Schedule Intern
              </NavLink>
                        </div>
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>

                            <img src={leaderImage} alt="" />
                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
                                to="/a"
                            >
                                Manage Task Intern
              </NavLink>
                        </div>
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>

                            <img src={leaderImage} alt="" />
                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
                                to="/a"
                            >
                                Manage Account Waiting
              </NavLink>
                        </div>
                        <div className="side-bar__inner__items--menu__item flex">
                            <div className="temp"></div>

                            <img src={leaderImage} alt="" />
                            <NavLink
                                activeClassName="side-bar__inner__items--menu__item__inner border-corner"
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
