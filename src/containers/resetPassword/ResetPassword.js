import React from "react";
import { useHistory } from "react-router";
import { resetPassword } from "redux/actions/resetPassword";
import { ROUTE_LOGIN } from "utils/routes";
import { Form } from "../../components/resetPassword";

const ResetPassword = () => {
  const history = useHistory();
  const handleResetPassword = (formData) => {
    resetPassword(formData, (res) => {
      if (res.success) {
        history.push(ROUTE_LOGIN);
      }
    });
  };

  return <Form handleSubmit={handleResetPassword} />;
};

export default ResetPassword;
