import React from "react";
import { Header, Footer } from "../components/layout";

const withAuthLayout = (Component, showMenu = false) => (props) => {
    return (
        <div className="app">
            <Header showMenu={showMenu} />
            <div className="app__body">
                <div className="app__content">
                    <div className="app__content__inner">
                        <Component {...props} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default withAuthLayout;
