import React from "react";
import { useHistory } from "react-router";
import { forgotPassword } from "redux/actions/forgotPassword";
import { ROUTE_RESETPASSWORD } from "utils/routes";
import { Form } from "../../components/forgotPassword";

const ForgotPassword = () => {
  const history = useHistory();
  const handleForgotPassword = (formData) => {
    forgotPassword(formData, (res) => {
      if (res.success) {
        history.push(ROUTE_RESETPASSWORD);
      }
    });
  };

  return <Form handleSubmit={handleForgotPassword} />;
};

export default ForgotPassword;
