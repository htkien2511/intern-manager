import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { forgotPassword } from "redux/actions/forgotPassword";
import { ROUTE_RESETPASSWORD } from "utils/routes";
import { Form } from "../../components/forgotPassword";

const ForgotPassword = () => {
  const history = useHistory();
  const handleForgotPassword = (formData) => {
    forgotPassword(formData, (res) => {
      if (res.success) {
        history.push(ROUTE_RESETPASSWORD);
      } else {
        toast.error(res.message);
      }
    });
  };

  return <Form handleSubmit={handleForgotPassword} />;
};

export default ForgotPassword;
