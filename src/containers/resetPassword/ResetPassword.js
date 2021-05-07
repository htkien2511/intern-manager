import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { resetPassword } from "redux/actions/resetPassword";
import { ROUTE_LOGIN } from "utils/routes";
import { Form } from "../../components/resetPassword";

const ResetPassword = () => {
  const history = useHistory();
  const handleResetPassword = (formData) => {
    resetPassword(formData, (res) => {
      if (res.success) {
        toast.success("Reset password successfully");
        setTimeout(() => {
          history.push(ROUTE_LOGIN);
        }, 3500);
      } else {
        toast.error(res.message);
      }
    });
  };

  return <Form handleSubmit={handleResetPassword} />;
};

export default ResetPassword;
