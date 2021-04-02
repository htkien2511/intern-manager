import CustomizedModal from "components/common/core/CustomizeModal";
import React from "react";
import styled from "styled-components";


export const HeaderModalAddTask = () => {
  return (
    <div className="header__modal__add__task">
      <div className="header__modal__add__task__inner">
        Header
      </div>
    </div>
  )
};


export const ContentModalAddTask = () => {
  return (
    <div className="content__modal__add__task">
      <div className="content__modal__add__task__inner">
        Content
      </div>
    </div>
  )
}

const ModalAddTask = () => {
  return (
    <ModalAddTaskContainer className="modal__add__task__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => (
            <HeaderModalAddTask />
          )}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentModalAddTask />
        </CustomizedModal.Content>
      </CustomizedModal>
    </ModalAddTaskContainer>
  )
};

const ModalAddTaskContainer = styled.div`
  .modal__container{
    .modal__inner{
      .modal__header{
        .header__modal__add__task{
          .header__modal__add__task__inner{
            padding: 5px;
          }
        }
      }
      .modal__content{
        .content__modal__add__task{
          .content__modal__add__task__inner{
            padding: 5px;
          }
        }
      }
    }
  }
`;

export default ModalAddTask;