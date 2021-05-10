import React from "react";
import styled from "styled-components";
import useToggle from "hooks/useToggle";
import { useDetectClickOutside } from "react-detect-click-outside";

const Trigger = () => {
  return null;
};

const Content = () => {
  return null;
};

const DropPanel = ({ children }) => {
  const { isShowing, show, hide, toggle } = useToggle();

  if (!Array.isArray(children)) {
    children = [children];
  }

  const trigger = children[0] || {};
  const content = children[1] || {};

  const ref = useDetectClickOutside({ onTriggered: hide });

  return (
    <DropContainer className="drop__container" ref={ref}>
      <div className="drop__trigger">
        {trigger
          ? trigger.props.children({ isShowing, show, hide, toggle })
          : null}
      </div>
      {isShowing ? (
        <div className="drop__content">
          {content
            ? content.props.children({ isShowing, show, hide, toggle })
            : null}
        </div>
      ) : null}
    </DropContainer>
  );
};
DropPanel.Trigger = Trigger;
DropPanel.Content = Content;

const DropContainer = styled.div`
  position: relative;

  .drop__content {
    position: absolute;
    z-index: 1;
    top: -2px;
    left: -90px;
  }
`;
export default DropPanel;
