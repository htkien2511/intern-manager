import React from "react";
import { Form } from "../../components/loginAdmin";
import { login } from "../../redux/actions/login";
import { setAuth } from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import { ROUTE_MANAGE_INTERN, ROUTE_MANAGE_LEADER } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";
import { toast } from "react-toastify";

const LoginAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    login(formData, (data) => {
      if (data.success) {
        if (data.data.role === "ROLE_ADMIN") {
          setAuth(data.data);
          const rememberedPath = localStorage.getItem("rememberedPath");
          if (rememberedPath) {
            history.push(rememberedPath);
          } else {
            history.push(ROUTE_MANAGE_LEADER);
          }
          dispatch(setTitle("Manage Leader"));
        } else if (data.data.role === "ROLE_USER") {
          toast.error("Your password or email is incorrect!");
        } else if (data.data.role === "ROLE_MANAGER") {
          setAuth(data.data);
          const rememberedPath = localStorage.getItem("rememberedPath");
          if (rememberedPath) {
            history.push(rememberedPath);
          } else {
            history.push(ROUTE_MANAGE_INTERN);
          }
        }
      } else {
        toast.error(data.message);
      }
    });
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LoginAdmin;
