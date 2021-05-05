import React from "react";
import { useHistory } from "react-router";
import { register } from "redux/actions/register";
import { ROUTE_LOGIN } from "utils/routes";
import { Form } from "../../components/register";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();
  const handleRegister = (formData) => {
    register(formData, (res) => {
      if (res.success) {
        toast.warning("Register successfully but waiting for admin accept!");
        setTimeout(() => {
          history.push({
            pathname: ROUTE_LOGIN,
            state: { email: res.data },
          });
        }, 5000);
      } else {
        toast.error(res.message);
      }
    });
  };

  return <Form handleSubmit={handleRegister} />;
};

export default Register;
