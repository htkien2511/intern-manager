import React from "react";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import { useSelector } from "react-redux";
import Notification from "components/common/core/Notification";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    password: "",
    confirmPassword: "",
    authCode: "",
  });
  const [errorResetPassword, setErrorResetPassword] = React.useState();
  const storeResetPassword = useSelector((store) => store.resetPassword);
  const loading = storeResetPassword && storeResetPassword.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.authCode)) {
      errorState.authCode = "Please enter code";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    if (isEmpty(form.confirmPassword)) {
      errorState.confirmPassword = "Please enter confirm password";
    } else {
      if (form.confirmPassword !== form.password) {
        errorState.confirmPassword =
          "Please enter confirm password match with password";
      }
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
      authCode: form.authCode,
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
    setErrorResetPassword("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="forgot-password">
      {storeResetPassword.data.message && (
        <Notification
          status={storeResetPassword.data.success}
          description={storeResetPassword.data.message}
        />
      )}
      <div className="forgot-password__inner">
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p>Reset password</p>
            <div className="error">{errorResetPassword}</div>
          </div>

          <FormBox
            propsInput={{
              name: "password",
              type: "password",
              placeholder: "New Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <FormBox
            propsInput={{
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirm New Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.confirmPassword,
              disabled: false,
            }}
            error={error.confirmPassword}
          />
          <FormBox
            propsInput={{
              name: "authCode",
              placeholder: "Authentication code",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.authCode,
              disabled: false,
            }}
            error={error.authCode}
          />
          <button disabled={loading} className="button button--secondary">
            Reset password
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
