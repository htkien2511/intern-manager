import React from "react";
import { Form } from "../../components/login";
import { login } from "../../redux/actions/login";
import { setAuth } from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import { ROUTE_PROFILE } from "../../utils/routes";
import { toast } from "react-toastify";

const LogIn = () => {
  const history = useHistory();

  const handleLogin = (formData) => {
    login(formData, (data) => {
      if (data.success) {
        if (data.data.role === "ROLE_USER") {
          setAuth(data.data);
          const rememberedPath = localStorage.getItem("rememberedPath");
          if (rememberedPath) {
            history.push(rememberedPath);
          } else {
            history.push(ROUTE_PROFILE);
          }
        } else {
          toast.error("Your password or email is incorrect!");
        }
      } else {
        toast.error(data.message);
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
