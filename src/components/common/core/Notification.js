import React, { useState } from "react";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import { useDetectClickOutside } from "react-detect-click-outside";

const Notification = ({ status, description }) => {
  const [show, setShow] = useState(true);
  const ref = useDetectClickOutside({ onTriggered: () => setShow(false) });

  return (
    <NotificationContainer className="notification__container" ref={ref}>
      {show && (
        <Alert variant="filled" severity={status ? "success" : "error"}>
          {description}
        </Alert>
      )}
    </NotificationContainer>
  );
};

const NotificationContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 20px;
`;

export default Notification;
