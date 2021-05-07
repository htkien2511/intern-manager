import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import { isEmpty, isEmail } from "validator";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { getAuth } from "utils/helpers";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FormBox } from "../../common";


function FormEdit() {
  const [imageUrl, setImageUrl] = useState(logo);
  const [errorEditProfile, setErrorEditProfile] = React.useState();
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    department: "",
    gender: true,
    address: "",
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  useEffect(() => {
    console.log("aaaa");
    console.log(getAuth().id);
    getProfileIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };
  const handleChangeGender = () => {
    setForm({ ...form, gender: !form.gender });
  };
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.fullName)) {
      errorState.fullName = "Please enter fullname";
    }
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (isEmpty(form.department)) {
      errorState.department = "Please enter department";
    }
    if (isEmpty(form.address)) {
      errorState.address = "Please enter address";
    }
    if (isEmpty(form.currentPass)) {
      errorState.currentPass = "Please enter current password";
    }
    if (isEmpty(form.newPass)) {
      errorState.newPass = "Please enter new password";
    }
    if (isEmpty(form.confirmPass)) {
      errorState.confirmPass = "Please enter confirm password";
    } else {
      if (form.confirmPass !== form.newPass) {
        errorState.confirmPass =
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
    setErrorEditProfile("");
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="form-edit">
      <h2>Edit Profile</h2>
      <div className="error">{errorEditProfile}</div>
      <div className="form-edit__body__edit">
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
              <label htmlFor="file">Upload Image</label>
            </div>
          </div>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
              >
                <Tab label="Profile Intern" {...a11yProps(0)} />
                <Tab label="Password" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <form className="form__edit" onSubmit={handleSubmit}>
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
                  <span className="error__editProfile">{error.fullName}</span>
                </div>
                <div className="edit_info__email">
                  <div>
                    <label>Email:</label>
                    <input
                      type="text"
                      value={form.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                     <FormBox
                        propsInput={{
                          name: "email",
                          placeholder: "Email",
                          onChange: handleChange,
                          onFocus: handleFocus,
                          value: form.email,
                        
                        }}
                        error={error.email}
                      />
                  </div>
                  <span className="error__editProfile">{error.email}</span>
                </div>
                <div className="edit_info__department">
                  <div>
                    <label>Department:</label>
                    <input
                      type="text"
                      value={form.department}
                      name="department"
                      placeholder="Department"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">{error.department}</span>
                </div>
                <div className="edit_info__sex">
                  <label id="title">Gender:</label>
                  <input
                    type="radio"
                    name="gender"
                    value={form.gender}
                    onChange={handleChangeGender}
                    checked={form.gender}
                  />
                  <span>Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value={!form.gender}
                    onChange={handleChangeGender}
                    checked={!form.gender}
                  />
                  <span>Female</span>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form className="form__edit" onSubmit={handleSubmit}>
                <div className="edit_current__pass">
                  <div>
                    <label>Current Password:</label>
                    <input
                      type="password"
                      placeholder="*******"
                      value={form.currentPass}
                      name="currentPass"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">
                    {error.currentPass}
                  </span>
                </div>
                <div className="edit_new__pass">
                  <div>
                    <label>New Password:</label>
                    <input
                      type="password"
                      placeholder="*******"
                      value={form.newPass}
                      name="newPass"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">{error.newPass}</span>
                </div>
                <div className="edit_confirm_pass">
                  <div>
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      placeholder="*******"
                      value={form.confirmPass}
                      name="confirmPass"
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <span className="error__editProfile">
                    {error.confirmPass}
                  </span>
                </div>
                <center>
                  <button className="btn-edit">Save</button>
                </center>
              </form>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormEdit;
