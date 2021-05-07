import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React from "react";
import styled from "styled-components";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { register } from "redux/actions/register";
// import { acceptUserRegister } from "redux/actions/admin/acceptUserRegister";
import { toast } from "react-toastify";
// import { getAllUser } from "redux/actions/admin/getAllUser";

export const HeaderModal = ({ close, title }) => {
  return (
    <div className="header__container">
      <div className="header__inner align__center">
        <span className="title">{title}</span>
        <div className="block__actions align__center">
          <span
            className="btn--cancel align__center"
            onClick={() => {
              close(false);
            }}
          >
            &#x2715;
          </span>
        </div>
      </div>
    </div>
  );
};

export const ContentModal = ({ setOpenModal, title, setData }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Please enter name";
    }
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    if (isEmpty(form.confirmPassword)) {
      errorState.confirmPassword = "Please enter confirm password";
    } else {
      if (form.confirmPassword !== form.password) {
        errorState.confirmPassword =
          "Please enter confirm password match with password";
      }
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
      name: form.name,
      email: form.email,
      password: form.password,
    };
    setOpenModal(false);

    register(formData, (res) => {
      if (res.success) {
        // run api accept user waiting
        // acceptUserRegister(res.data.id);
        // getAllUser((response) => {
        //   if (response.success) {
        //     setData(response.data);
        //   } else {
        //     toast.error(response.message);
        //   }
        // });
        toast.success(`General account ${res.data} successfully!`);
      } else {
        toast.error(res.message);
      }
    });
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
                disabled: title !== "Add account user",
              }}
              error={error.email}
            />
          </div>
          <FormBox
            propsInput={{
              type: "password",
              name: "password",
              placeholder: "Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <FormBox
            propsInput={{
              type: "password",
              name: "confirmPassword",
              placeholder: "Confirm password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.confirmPassword,
              disabled: false,
            }}
            error={error.confirmPassword}
          />
          <button className="btn--save align__center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
              <g id="Layer_2" data-name="Layer 2">
                <path
                  d="M14,0H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V4ZM9,16a3,3,0,1,1,3-3A3,3,0,0,1,9,16ZM12,6H2V2H12Z"
                  fill="#ffff"
                />
              </g>
            </svg>
          </button>
        </ReForm>
      </div>
    </div>
  );
};

const ModalCreateAccount = ({ setOpenModal, title, setData }) => {
  return (
    <ModalAddAccountUserContainer className="modal__add__user__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => <HeaderModal close={setOpenModal} title={title} />}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentModal
            setOpenModal={setOpenModal}
            title={title}
            setData={setData}
          />
        </CustomizedModal.Content>
      </CustomizedModal>
    </ModalAddAccountUserContainer>
  );
};

const ModalAddAccountUserContainer = styled.div`
  .modal__inner {
    .modal__header {
      .header__container {
        .header__inner {
          padding: 10px 15px;
          justify-content: space-between;
          .title {
            font-size: 22px;
            color: brown;
          }
          .block__actions {
            .btn--cancel {
              width: 30px;
              height: 30px;
              background: red;
              color: white;
              border-radius: 5px;
              &:hover {
                cursor: pointer;
                background: #ff5a5a;
              }
            }
          }
        }
      }
    }
    .modal__content {
      .content__inner {
        padding: 10px 15px;
        .re__form {
          & > div {
            & > label {
              font-size: 16px;
              color: rebeccapurple;
            }
            & > div > input {
              height: 50px;
            }
          }
        }
      }
    }
  }
`;
export default ModalCreateAccount;
