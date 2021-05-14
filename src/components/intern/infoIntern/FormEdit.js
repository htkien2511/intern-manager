import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logoGuess.png";
import { isEmpty, isEmail } from "validator";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { getAuth } from "utils/helpers";
import { Tabs } from "antd";
import { getAllDepartments } from "redux/actions/getAllDepartments";
import { Input } from "reactstrap";
import { updateAccount } from "redux/actions/updateAccount";
import { toast } from "react-toastify";
import { changePassword } from "redux/actions/changePassword";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";

function FormEdit() {
  const { TabPane } = Tabs;
  const [imageUrl, setImageUrl] = useState(logo);
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    id: "",
    name: "",
    email: "",
    department: "",
    gender: "",
    address: "",
  });
  const [formChangePass, setFormChangePass] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    getProfileIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);

  const [departments, setDepartments] = useState([]);
  const [departObject, setDepartObject] = useState([]);

  useEffect(() => {
    getAllDepartments((res) => {
      if (res.success) {
        setDepartments(res.data.map((item) => item.name));
        setDepartObject(res.data);
        setError({ ...error, department: "" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      id: form.id,
      name: form.name,
      email: form.email,
      gender: !isEmpty(form.gender) ? form.gender : "Male",
      department: form.department
        ? departObject
            .filter((item) => item.name === form.department)
            .find((item, index) => index === 0).id
        : departObject
            .filter((item) => item.name === departments[0])
            .find((item, index) => index === 0).id,
      address: form.address,
    };
    // run api update account
    updateAccount(formData, (res) => {
      if (res.success) {
        setForm(res.data);
        console.log(res);
        toast.success("Updated successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSubmitChangePassword = (event) => {
    event.preventDefault();
    const errorState = validateFormChangePass();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      oldPassword: formChangePass.oldPassword,
      newPassword: formChangePass.newPassword,
    };
    changePassword(formData, (res) => {
      if (res.success) {
        toast.success("Changed password successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangePassword = (event) => {
    setFormChangePass({
      ...formChangePass,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Please enter name";
    }
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (!(departments.length > 0)) {
      errorState.department = "Please waiting get all departments";
    }
    if (isEmpty(form.address)) {
      errorState.address = "Please enter address";
    }
    return errorState;
  };

  const validateFormChangePass = () => {
    const errorState = {};
    if (isEmpty(formChangePass.oldPassword)) {
      errorState.oldPassword = "Please enter current password";
    }
    if (isEmpty(formChangePass.newPassword)) {
      errorState.newPassword = "Please enter new password";
    }
    if (isEmpty(formChangePass.confirmNewPassword)) {
      errorState.confirmNewPassword = "Please enter confirm password";
    } else {
      if (formChangePass.confirmNewPassword !== formChangePass.newPassword) {
        errorState.confirmNewPassword =
          "Please enter confirm password match with password";
      }
    }
    return errorState;
  };
  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };
  function callback(key) {
    console.log(key);
  }

  const storeUpdateProfile = useSelector((store) => store.updateAccount);
  const storeChangePassword = useSelector((store) => store.changePassword);

  return (
    <div className="form-edit flex flex-row align__center">
      {(storeUpdateProfile.loading || storeChangePassword.loading) && (
        <SpinLoading />
      )}
      <div className="form-edit__body__edit__info">
        <div className="edit-avatar">
          <img src={imageUrl} className="avatar" alt="avatar" />
          <div className="file align__center">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={(event) => {
                setImageUrl(URL.createObjectURL(event.target.files[0]));
              }}
            />
            <label htmlFor="file" style={{ marginBottom: 0 }}>
              Upload Image
            </label>
          </div>
        </div>
        <div className="form__edit">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Edit Profile" key="1">
              <form className="" onSubmit={handleSubmit}>
                <div className="edit_info__name">
                  <div>
                    <label>Full name:</label>
                    <input
                      type="text"
                      value={form.name}
                      name="name"
                      placeholder="Full name"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">{error.name}</span>
                </div>
                <div className="edit_info__email">
                  <div>
                    <label>Email:</label>
                    <input
                      style={{ background: "#e9ecef" }}
                      type="text"
                      value={form.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      disabled
                    />
                  </div>
                  <span className="error__editProfile">{error.email}</span>
                </div>
                <div className="edit_info__email">
                  <div>
                    <label>Gender</label>
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      placeholder="Gender"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      value={form.gender}
                    >
                      {["Male", "Female"].map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </Input>
                  </div>
                  <span
                    className="invalid-feedback"
                    style={{ display: "block", marginLeft: 15 }}
                  >
                    {error.gender}
                  </span>
                </div>

                <div className="edit_info__email">
                  <div>
                    <label>Department</label>
                    <Input
                      type="select"
                      name="department"
                      id="department"
                      placeholder="Department"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      value={form.department}
                      disabled
                    >
                      {departments.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </Input>
                  </div>
                  <span
                    className="invalid-feedback"
                    style={{ display: "block", marginLeft: 15 }}
                  >
                    {error.department}
                  </span>
                </div>
                <div className="edit_info__address">
                  <div>
                    <label>Address:</label>
                    <input
                      type="text"
                      value={form.address}
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">{error.address}</span>
                </div>
                <center>
                  <button className="btn-edit">Save</button>
                </center>
              </form>
            </TabPane>
            <TabPane tab="Change password" key="2">
              <form className="" onSubmit={handleSubmitChangePassword}>
                <div className="edit_current__pass">
                  <div>
                    <label>Current Password:</label>
                    <input
                      type="password"
                      value={formChangePass.oldPassword}
                      name="oldPassword"
                      placeholder="Current password"
                      onChange={handleChangePassword}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">
                    {error.oldPassword}
                  </span>
                </div>
                <div className="edit_new__pass">
                  <div>
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={formChangePass.newPassword}
                      name="newPassword"
                      placeholder="New password"
                      onChange={handleChangePassword}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">
                    {error.newPassword}
                  </span>
                </div>
                <div className="edit_confirm_pass">
                  <div>
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={form.confirmNewPassword}
                      name="confirmNewPassword"
                      onChange={handleChangePassword}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">
                    {error.confirmNewPassword}
                  </span>
                </div>
                <center>
                  <button className="btn-edit">Save</button>
                </center>
              </form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default FormEdit;
