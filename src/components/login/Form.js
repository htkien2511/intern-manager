import React from "react";
import { Link } from "react-router-dom";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import { ROUTE_FORGOTPASSWORD, ROUTE_REGISTER } from "../../utils/routes";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errorLogin, setErrorLogin] = React.useState();
  const storeLogin = useSelector((store) => store.login);
  const loading = storeLogin.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    return errorState;
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      email: form.email,
      password: form.password,
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setErrorLogin("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner flex items-center contents-center">
        <img src="https://picsum.photos/400/600" alt="" />
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p>Login to your account</p>
            <div className="error">{errorLogin}</div>
          </div>

          <FormBox
            propsInput={{
              name: "email",
              placeholder: "Email",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.email,
              disabled: false,
            }}
            error={error.email}
          />

          <FormBox
            propsInput={{
              type: "password",
              name: "password",
              placeholder: "Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <button disabled={loading} className="button button--secondary">
            Login
          </button>
          <div className="flex space-between">
            <div>
              <Link to={ROUTE_FORGOTPASSWORD} className="primary link">
                Forgot Password?
              </Link>
            </div>
            <div>
              <Link to={ROUTE_REGISTER} className="primary link">
                Register
              </Link>
            </div>
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
