import React from "react";
import { Redirect } from "react-router";
import { getAuth } from "utils/helpers";
import { ROUTE_MANAGE_LEADER, ROUTE_PROFILE } from "utils/routes";
import { Header, Footer } from "../components/layout";
import { ToastContainer } from "react-toastify";

const withAuthLayout = (Component, showLogo = true) => (props) => {
  return (
    <div className="app">
      {!(getAuth() && getAuth().token) ? (
        <>
          <Header showLogo={showLogo} />
          <div className="app__body">
            <div className="app__content">
              <div className="app__content__inner">
                <ToastContainer />
                <Component {...props} />
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : getAuth().role === "ROLE_USER" ? (
        <Redirect to={ROUTE_PROFILE} />
      ) : (
        <Redirect to={ROUTE_MANAGE_LEADER} />
      )}
    </div>
  );
};

export default withAuthLayout;
