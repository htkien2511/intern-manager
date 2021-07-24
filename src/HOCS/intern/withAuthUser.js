import React from "react";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import { rememberPath } from "redux/actions/login";
import { getAuth } from "utils/helpers";
import { ROUTE_LOGIN } from "utils/routes";
import { HeaderUser } from "../../components/layout";

const withAuthUser =
  (Component, showMenu = false) =>
  (props) => {
    rememberPath(window.location.pathname);
    return (
      <>
        <ToastContainer position="top-center" autoClose={3500} />
        {getAuth() && getAuth().token && getAuth().role === "ROLE_USER" ? (
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
