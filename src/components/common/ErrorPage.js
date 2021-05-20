import React from "react";
import { Result } from "antd";

const ErrorPage = ({ message }) => {
  return (
    <Result
      status="403"
      // title="404"
      subTitle={message}
      // extra={<Button type="primary">Back Home</Button>}
    />
  );
};
export default ErrorPage;
