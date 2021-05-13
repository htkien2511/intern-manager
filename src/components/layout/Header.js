import React from "react";
import { NavLink } from "react-router-dom";
import LogoOfficial from "assets/images/logoInternManage.png";
import { getAuth } from "../../utils/helpers";
import { ROUTE_LOGIN } from "../../utils/routes";
import DropdownUserMenu from "../common/DropdownUserMenu";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidebar } from "redux/actions/admin/setShowSidebar";

function Header({ showLogo, title }) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const storeSetShowSidebar = useSelector((store) => store.setShowSidebar);

  return (
    <div className="header">
      <div className="header__inner flex items-center space-between">
        {!showLogo ? (
          <div className="header__inner__title flex items-center">
            <MenuFoldOutlined
              style={{
                cursor: "pointer",
                position: "absolute",
                left: 10,
                color: "whitesmoke",
              }}
              onClick={() =>
                dispatch(setShowSidebar(!storeSetShowSidebar.showSidebar))
              }
            />
            <span>{title}</span>
          </div>
        ) : (
          <NavLink to="/" className="header__inner__logo">
            <img src={LogoOfficial} alt="Logo" />
          </NavLink>
        )}
        <div className="header__inner__menu flex items-center">
          {showLogo && (
            <>
              <i className="fi-rr-home"></i>
              <NavLink activeClassName="--active" to="/" exact>
                <span>Home page</span>
              </NavLink>
            </>
          )}
          {auth && auth.token ? (
            <div className="flex items-center">
              <span style={{ marginTop: 20, color: "white" }}>
                {getAuth().name}
              </span>
              <DropdownUserMenu auth={auth} />
            </div>
          ) : (
            <NavLink activeClassName="--active" to={ROUTE_LOGIN}>
              <button className="button button--login">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
