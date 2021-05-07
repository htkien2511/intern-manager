import React from "react";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorRegister, setErrorRegister] = React.useState();
  const storeRegister = useSelector((store) => store.register);
  const loading = storeRegister.loading;
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
      email: form.email.trim(),
      password: form.password.trim(),
      name: form.name.trim(),
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setErrorRegister("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="register">
      {loading && <SpinLoading />}
      <div className="register__inner">
        <ReForm className="radius-l login__inner__form">
          <div className="login__inner__form__text">
            <p>Register your account</p>
            <div className="error">{errorRegister}</div>
          </div>

          <FormBox
            propsInput={{
              name: "name",
              placeholder: "Name",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.name,
              disabled: false,
            }}
            error={error.name}
          />
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
          <FormBox
            propsInput={{
              type: "password",
              name: "confirmPassword",
              placeholder: "Confirm password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.confirmPassword,
              disabled: false,
            }}
            error={error.confirmPassword}
          />
          <button disabled={loading} className="button button--secondary">
            Register
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
