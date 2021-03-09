import React from "react";
import { Redirect } from "react-router";
import { Header, SideBar } from "../components/layout";
import { getAuth } from "../utils/helpers";
import { ROUTE_ADMIN_LOGIN } from "../utils/routes";


const withAuth = (Component, showMenu = false) => (props) => {
  return (
    <div className="app">
      {getAuth() && getAuth().token ? (
        <>
          <Header showMenu={showMenu} />
          <div className="app__body">
            <div className="app__content__sidebar">
              <div className="app__content__inner sidebar">
                <SideBar />
                <Component {...props} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Redirect to={ROUTE_ADMIN_LOGIN} />
      )}
    </div>
  );
};

export default withAuth;
