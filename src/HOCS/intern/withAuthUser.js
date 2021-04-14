import React from "react";
import { Redirect } from "react-router";
import { getAuth } from "utils/helpers";
import { ROUTE_LOGIN } from "utils/routes";
import { HeaderUser } from "../../components/layout";

const withAuthUser = (Component, showMenu = false) => (props) => {
    return (
        <>
            {(getAuth() && getAuth().token && getAuth().role === "ROLE_USER") ? (
                <>
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
                </>
            ) : (
                <Redirect to={ROUTE_LOGIN} />
            )}
        </>
    );
};

export default withAuthUser;