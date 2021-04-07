import React from "react";
import { Form } from "../../components/login";
import { login } from "../../redux/actions/login";
import { setAuth } from "../../utils/helpers";
import { useHistory } from "react-router-dom"
import { ROUTE_MANAGE_LEADER } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";

const LogIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    console.log({ formData });
    login(formData, (data) => {
      if (data) {
        setAuth(data);
        dispatch(setTitle("Manage Leader"));
        history.push(ROUTE_MANAGE_LEADER);
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
