import React from "react";
import { Form } from "../../components/login";
import { login } from "../../redux/actions/login";
import { setAuth } from "../../utils/helpers";
import { useHistory } from "react-router-dom"
import { ROUTE_MANAGE_LEADER, ROUTE_PROFILE } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";

const LogIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    login(formData, (data) => {
      if (data.success) {
        setAuth(data.data);
        if (data.data.role === "ROLE_ADMIN") {
          dispatch(setTitle("Manage Leader"));
          history.push(ROUTE_MANAGE_LEADER);
        } else if (data.data.role === "ROLE_USER") {
          history.push(ROUTE_PROFILE);
        }
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
