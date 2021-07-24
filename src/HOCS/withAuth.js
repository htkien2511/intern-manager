import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import { rememberPath } from "redux/actions/login";
import { Header, SideBar } from "../components/layout";
import { getAuth } from "../utils/helpers";
import { ROUTE_ADMIN_LOGIN } from "../utils/routes";

const withAuth =
  (Component, showLogo = true) =>
  (props) => {
    const titleCurrent = useSelector((store) => store.setTitle.title);
    const storeSetShowSidebar = useSelector((store) => store.setShowSidebar);
    rememberPath(window.location.pathname);

    return (
      <div className="app__admin flex flex-row">
        <ToastContainer position="top-center" autoClose={3500} />
        {getAuth() &&
        getAuth().token &&
        (getAuth().role === "ROLE_ADMIN" ||
          getAuth().role === "ROLE_MANAGER") ? (
          <>
            <SideBar />
            <div
              className={`app__admin__body ${
                !storeSetShowSidebar.showSidebar &&
                "app__admin__body--no-sidebar"
              }`}
            >
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
