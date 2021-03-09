import React from "react";
function SideBar() {

    return (
        <div className="side-bar">
            <div className="side-bar__inner flex items-center space-between">
                <div className="side-bar__inner-item">
                    <div className="side-bar__inner-item__inner border-corner">Manage Account Intern</div>
                </div>
                <div className="side-bar__inner-item">
                    <div className="side-bar__inner-item__inner border-corner">Item2</div>
                </div>
                <div className="side-bar__inner-item">
                    <div className="side-bar__inner-item__inner border-corner">Item3</div>
                </div>
                <div className="side-bar__inner-item">
                    <div className="side-bar__inner-item__inner border-corner">Item4</div>
                </div>
                <div className="side-bar__inner-item">
                    <div className="side-bar__inner-item__inner border-corner">Item5</div>
                </div>
            </div>
        </div>
    );
}
export default SideBar;
