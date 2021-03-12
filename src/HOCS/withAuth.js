import React from "react";
import { Header, SideBar } from "../components/layout";

const withAuth = (Component, showMenu = false) => (props) => {
  return (
    <div className="app">
      <Header showMenu={showMenu} />
      <div className="app__body">
        <div className="app__content__sidebar">
          <div className="app__content__inner sidebar">
            <SideBar />
            <Component {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth;
