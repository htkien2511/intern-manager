import React from "react";
import { NavLink } from "react-router-dom";
function SideBar() {

    return (
        <div className="side-bar">
            <div className="side-bar__inner flex items-center space-between">
                <div className="side-bar__inner__items">
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">Manage Leader</NavLink>
                    </div>
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">Manage Intern</NavLink>
                    </div>
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">Manage Work Schedule Intern</NavLink>
                    </div>
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">Manage Task Intern</NavLink>
                    </div>
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">Manage Account Waiting</NavLink>
                    </div>
                    <div className="side-bar__inner__items--item">
                        <NavLink activeClassName="side-bar__inner__items--item__inner border-corner" to="/a">View statistics</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default SideBar;
