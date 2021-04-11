import React from "react";
import styled from "styled-components";
import CustomizedModal from "./CustomizeModal";

export const HeaderPopup = ({ title }) => {
  return (
    <div className="header__popup__container align__center">
      <span>{title}</span>
    </div>
  )
}

export const ContentPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="content__popup__container align__center">
      <div className="block--cancel align__center" onClick={() => onCancel(false)}>Cancel</div>
      <div className="block--confirm align__center" onClick={() => onConfirm(true)}>Yes</div>
    </div>
  )
}

const Popup = ({ onCancel, onConfirm, title }) => {
  return (
    <PopupContainer className="popup__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => (
            <HeaderPopup title={title} />
          )}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentPopup onConfirm={onConfirm} onCancel={onCancel} />
        </CustomizedModal.Content>
      </CustomizedModal>
    </PopupContainer>
  )
}

const PopupContainer = styled.div`
  .modal__container{
    .modal__inner{
      .modal__header{
        .header__popup__container{
          height: 100px;
          background: #e0e2e0;
          &>span{
            font-size: 20px;
            font-weight: bold;
            color: red;
          }
        }
      }
      .modal__content{
        .content__popup__container{
          .block--cancel{
            background: gray;
            width: 50%;
            height: 80px;
            color: black;
            &:hover, &:focus{
              background: #a7a7a7;
              cursor: pointer;
            }
          }
          .block--confirm{
            background: #c33e3e;
            color: white;
            height: 80px;
            width: 50%;
            &:hover, &:focus{
              background: red;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

export default Popup;