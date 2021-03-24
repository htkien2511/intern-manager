import React from "react";
import { Header, Footer } from "../components/layout";

const withAuthLayout = (Component, showLogo = true) => (props) => {
    return (
        <div className="app">
            <Header showLogo={showLogo} />
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
