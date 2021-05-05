import React from "react";
import { useHistory } from "react-router";
import { register } from "redux/actions/register";
import { ROUTE_LOGIN } from "utils/routes";
import { Form } from "../../components/register";

const Register = () => {
  const history = useHistory();
  const handleRegister = (formData) => {
    register(formData, (res) => {
      if (res.success) {
        history.push({
          pathname: ROUTE_LOGIN,
          state: { email: res.data },
        });
      }
    });
  };

  return <Form handleSubmit={handleRegister} />;
};

export default Register;
