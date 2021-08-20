import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { getAuth } from "utils/helpers";
import { ROUTE_ADMIN_LOGIN, ROUTE_LOGIN } from "../../utils/routes";
import avatarDefault from "assets/images/avtDefault.png";
import { useSelector } from "react-redux";

const DropdownUserMenu = () => {
  const [isShown, setIsShown] = useState(false);

  const logoutWrapper = useRef(null);

  const storeSetAvatar = useSelector((store) => store.setAvatar);

  console.log(storeSetAvatar.avatar);

  const useClickOutside = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useClickOutside(logoutWrapper);
  const history = useHistory();
  return (
    <div ref={logoutWrapper} className="style-userContainer">
      {/* <div className="style-userInfor"> */}
      <img
        src={storeSetAvatar.avatar ? storeSetAvatar.avatar : avatarDefault}
        alt=""
        className="style-avatarContainer"
        onClick={() => setIsShown(!isShown)}
      />
      {/* <i className="fi-rr-caret-down"></i> */}
      {/* </div> */}
      {isShown && (
        <div className="style-dropdownContainer">
          <div
            className="style-dropdownItem"
            onClick={() => {
              if (getAuth().role === "ROLE_USER") {
                history.push(ROUTE_LOGIN);
              } else {
                history.push(ROUTE_ADMIN_LOGIN);
              }
              localStorage.clear();
            }}
          >
            <i className="fi-rr-sign-out" />
            <span className="">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropdownUserMenu;
