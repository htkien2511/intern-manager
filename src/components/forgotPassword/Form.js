import React from "react";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ email: "" });
  const [errorForgotPassword, setErrorForgotPassword] = React.useState();
  const storeForgotPassword = useSelector((store) => store.forgotPassword);
  const loading = storeForgotPassword.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.email)) {
      errorState.email = "Please enter user name";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
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
      email: form.email,
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
    setErrorForgotPassword("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="forgot-password">
      {loading && <SpinLoading />}
      <div className="forgot-password__inner">
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p>Forgot password?</p>
            <div className="error">{errorForgotPassword}</div>
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
          <button disabled={loading} className="button button--secondary">
            Send mail
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
