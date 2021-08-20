import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_EDIT_PROFILE } from "../../../utils/routes";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { getAuth } from "utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import avatarDefault from "assets/images/avtDefault.png";
import { setAvatar } from "redux/actions/intern/setAvatar";

function FormWatch() {
  const [form, setForm] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProfileIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
      dispatch(setAvatar(output.data.avatar));
    });
    // eslint-disable-next-line
  }, []);

  const loadingGetData = useSelector((store) => store.getProfileIntern).loading;
  const storeSetAvatar = useSelector((store) => store.setAvatar);

  console.log(storeSetAvatar.avatar);

  return (
    <div className="form-watch">
      {loadingGetData && <SpinLoading />}
      <div className="form-watch__body">
        <div className="form-watch__body__info">
          <div className="info_avatar align__center">
            <img
              src={
                storeSetAvatar.avatar ? storeSetAvatar.avatar : avatarDefault
              }
              className="avatar"
              alt="avatar"
            />
          </div>
          <form>
            <div className="info__name">
              <label>Full name:</label>
              <p>{form.name ? form.name : "No full name"}</p>
            </div>
            <div className="info__email">
              <label>Email:</label>
              <p>{form.email ? form.email : "No email"}</p>
            </div>
            <div className="info__department">
              <label>Department:</label>
              <p>{form.department ? form.department : "No department"}</p>
            </div>
            <div className="info__sex">
              <label id="sex">Gender:</label>
              <p>{form.gender ? form.gender : "No gender"}</p>
            </div>
            <div className="info__address">
              <label>Address:</label>
              <p>{form.address ? form.address : "No address"}</p>
            </div>
            <NavLink activeClassName="--active" to={ROUTE_EDIT_PROFILE}>
              <button
                className="btn-edit"
                style={{ width: "300px", textAlign: "center" }}
              >
                Edit Profile & Change Password
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormWatch;
