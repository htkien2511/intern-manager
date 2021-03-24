import React, { useState, useEffect, useRef } from "react";

const DropdownUserMenu = () => {
  const [isShown, setIsShown] = useState(false);

  const logoutWrapper = useRef(null);

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
  return (
    <div ref={logoutWrapper} className="style-userContainer">
      <div className="style-userInfor" onClick={() => setIsShown(!isShown)}>
        <img src="https://picsum.photos/200" alt="" className="style-avatarContainer" />
      </div>
      {isShown && (
        <div className="style-dropdownContainer">
          <div className="style-dropdownItem" onClick={() => localStorage.clear()}>
            <i class="fi-rr-sign-out" />
            <span className="">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropdownUserMenu;