import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router";
import { getAuth } from "utils/helpers";
import {
  ROUTE_ADMIN_LOGIN,
  ROUTE_MANAGE_INTERN,
  ROUTE_MANAGE_LEADER,
  ROUTE_PROFILE,
} from "utils/routes";

const InvalidPage = () => {
  const history = useHistory();
  function handleBackHome() {
    if (getAuth().token) {
      if (getAuth().role === "ROLE_ADMIN") {
        history.push(ROUTE_MANAGE_LEADER);
      } else {
        if (getAuth().role === "ROLE_MANAGER") {
          history.push(ROUTE_MANAGE_INTERN);
        } else {
          history.push(ROUTE_PROFILE);
        }
      }
    } else {
      if (history.location.pathname.split("/").includes("admin")) {
        history.push(ROUTE_ADMIN_LOGIN);
      } else {
        history.push("/");
      }
    }
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this page doesn't exist"
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};
export default InvalidPage;
