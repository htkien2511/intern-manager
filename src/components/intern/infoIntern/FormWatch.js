import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logoGuess.png";
import { NavLink } from "react-router-dom";
import { ROUTE_EDIT_PROFILE } from "../../../utils/routes";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { getAuth } from "utils/helpers";
function FormWatch() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    gender: "",
    address: "",
  });
  useEffect(() => {
    getProfileIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);
  return (
    <div className="form-watch">
      <h2>Intern's Profile</h2>
      <div className="form-watch__body">
        <div className="form-watch__body__info">
          <div className="info_avatar align__center">
            <img src={logo} className="avatar" alt="avatar" />
          </div>
          <form>
            <div className="info__name">
              <label>Full name:</label>
              <p>{form.name}</p>
            </div>
            <div className="info__email">
              <label>Email:</label>
              <p>{form.email}</p>
            </div>
            <div className="info__department">
              <label>Department:</label>
              <p>{form.department ? form.department : "No fill department"}</p>
            </div>
            <div className="info__sex">
              <label id="sex">Gender:</label>
              <p>{form.gender ? form.gender : "No fill gender"}</p>
            </div>
            <div className="info__address">
              <label>Address:</label>
              <p>{form.address ? form.address : "No fill address"}</p>
            </div>
            <NavLink activeClassName="--active" to={ROUTE_EDIT_PROFILE}>
              <button className="btn-edit">Edit Profile</button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormWatch;
