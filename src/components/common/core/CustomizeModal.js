import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return null
}

const Content = () => {
  return null
}

const CustomizedModal = ({ open, children }) => {
  if (!Array.isArray(children)) {
    children = [children]
  }

  const header = children?.find((child) => child.type.name === 'Header') || {}
  const content = children?.find((child) => child.type.name === 'Content') || {}

  return (
    <>
      <ModalContainer className="modal__container align__center">
        <div className="modal__inner">
          <div className="modal__header">
            {header
              ? header.props?.children({ open })
              : null}
          </div>
          <div className="modal__content">{content.props?.children}</div>
        </div>
      </ModalContainer>
    </>
  )
}

CustomizedModal.Header = Header
CustomizedModal.Content = Content

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index:9999;

  background: #00000043 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  .modal__inner {
    margin: auto;

    width: 450px;

    background: var(--unnamed-color-eaeaea) 0% 0% no-repeat padding-box;
    background: #eaeaea 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 12px #0000004d;
    opacity: 1;
    .modal__content{
      background: white;
    }
  }
`

export default CustomizedModal
