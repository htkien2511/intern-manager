import React from "react";
import { Form } from "../../components/login";
import { login } from "../../redux/actions/login";
import { setAuth } from "../../utils/helpers";
import { useHistory } from "react-router-dom"
import { ROUTE_MANAGE_INTERN } from "../../utils/routes";

const LogIn = () => {
  const history = useHistory();
  const handleLogin = (formData) => {
    console.log({ formData });
    login(formData, (data) => {
      if (data) {
        setAuth(data);
        history.push(ROUTE_MANAGE_INTERN);
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
