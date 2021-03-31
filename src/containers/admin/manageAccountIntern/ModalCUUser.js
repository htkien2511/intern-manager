import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React from "react";
import styled from "styled-components"
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { v4 as uuidv4 } from 'uuid';

export const HeaderModal = ({ close, title }) => {
  return (
    <div className="header__container">
      <div className="header__inner align__center">
        <span className="title">{title}</span>
        <div className="block__actions align__center">
          <span className="btn--cancel align__center" onClick={() => { close(false) }}>&#x2715;</span>
        </div>
      </div>
    </div>
  )
}

export const ContentModal = ({ data, setOpenModal, setDataFull }) => {
  const info = data || {};
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ id: info.id || uuidv4(), name: info.name || "", email: info.email || "", department: info.department || "", address: info.address || "" });
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (isEmpty(form.name)) {
      errorState.name = "Please enter name";
    }
    if (isEmpty(form.department)) {
      errorState.department = "Please enter department";
    }
    if (isEmpty(form.address)) {
      errorState.address = "Please enter address";
    }
    return errorState;
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      id: form.id,
      name: form.name,
      email: form.email,
      department: form.department,
      address: form.address,
    };
    // input for api update and add user
    console.log({ formData });
    setOpenModal(false);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };


  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        <ReForm className="re__form">
          {info.id && (
            <div>
              <label>Id</label>
              <FormBox
                propsInput={{
                  type: "text",
                  name: "id",
                  placeholder: "Id",
                  value: form.id,
                  disabled: true,
                }}
                error={error.password}
              />
            </div>
          )}
          <div>
            <label>Name</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "name",
                placeholder: "Name",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.name,
                disabled: false,
              }}
              error={error.name}
            />
          </div>
          <div>
            <label>Email</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "email",
                placeholder: "Email",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.email,
                disabled: false,
              }}
              error={error.email}
            />
          </div>
          <div>
            <label>Department</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "department",
                placeholder: "Department",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.department,
                disabled: false,
              }}
              error={error.department}
            />
          </div>
          <div>
            <label>Address</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "address",
                placeholder: "Address",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.address,
                disabled: false,
              }}
              error={error.address}
            />
          </div>
          <button className="btn--save align__center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
              <g id="Layer_2" data-name="Layer 2">
                <path d="M14,0H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V4ZM9,16a3,3,0,1,1,3-3A3,3,0,0,1,9,16ZM12,6H2V2H12Z" fill="#ffff" />
              </g>
            </svg>
          </button>
        </ReForm>
      </div>
    </div>
  )
}

const ModalCUUser = ({ setOpenModal, title, infoUser }) => {
  return (
    <ModalAddAccountUserContainer className="modal__add__user__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => (
            <HeaderModal close={setOpenModal} title={title} />
          )}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentModal data={infoUser} setOpenModal={setOpenModal} />
        </CustomizedModal.Content>
      </CustomizedModal>
    </ModalAddAccountUserContainer>
  )
}

const ModalAddAccountUserContainer = styled.div`
  .modal__inner{
    .modal__header{
      .header__container{
        .header__inner{
          padding: 10px 15px;
          justify-content: space-between;
          .title{
            font-size: 22px;
            color: brown;
          }
          .block__actions{
            .btn--cancel{
              width: 30px;
              height: 30px;
              background: red;
              color: white;
              border-radius: 5px;
              &:hover{
                cursor: pointer;
                background: #ff5a5a;
              }
            }
          }
        }
      }
    }
    .modal__content{
      .content__inner{
        padding: 10px 15px;
        .re__form{
          &>div{
            &>label{
              font-size: 16px;
              color: rebeccapurple;
            }
            &>div>input{
              height: 50px;
            }
          }
        }
      }
    }
  }
`;
export default ModalCUUser;