import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__inner__logo">
                    <img src={logo} alt="" />
                    <p className="margin-t-s">© ManageIntern, Inc. 2021</p>
                </div>
                <div className="footer__inner__links">
                    <div className="footer__inner__links__item">
                        <p className="text--xlarge underline underline--secondary margin-b">
                            learn more
            </p>
                        <ul>
                            <li className>
                                <NavLink activeClassName="--active" exact to="/">
                                    <span className="link">Home page</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__inner__links__item">
                        <p className="text--xlarge underline underline--secondary margin-b">
                            support
            </p>
                        <ul>
                            {(
                                <li>
                                    <NavLink activeClassName="--active" to="/feedback">
                                        <span className="link">Feedback</span>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="footer__inner__links__item follow-us">
                        <p className="text--xlarge underline underline--secondary margin-b">
                            Follow us
            </p>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/shapeecloud">
                                    <span className="icon-facebook"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
