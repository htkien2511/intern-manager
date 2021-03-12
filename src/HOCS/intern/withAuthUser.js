import React from "react";
import { HeaderUser } from "../../components/layout";

const withAuthUser = (Component, showMenu = false) => (props) => {
    return (
        <div className="app">
            <HeaderUser showMenu={showMenu} />
            <div className="app__body">
                <div className="app__content">
                    <div className="app__content__inner">
                        <Component {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuthUser;