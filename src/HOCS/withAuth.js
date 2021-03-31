import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Header, SideBar } from "../components/layout";
import { getAuth } from "../utils/helpers";
import { ROUTE_ADMIN_LOGIN } from "../utils/routes";


const withAuth = (Component, showLogo = true) => (props) => {
  const titleCurrent = useSelector(store => store.setTitle.title);
  return (
    <div className="app__admin flex flex-row">
      {(getAuth() && getAuth().token) ? (
        <>
          <SideBar />
          <div className="app__admin__body">
            <Header showLogo={showLogo} title={titleCurrent} />
            <Component {...props} />
          </div>
        </>
      ) : (
        <Redirect to={ROUTE_ADMIN_LOGIN} />
      )}
    </div>
  );
};

export default withAuth;
