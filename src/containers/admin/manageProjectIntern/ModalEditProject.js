import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form as ReForm, Input } from "reactstrap";
import { isEmpty } from "validator";
import moment from "moment";
import { toast } from "react-toastify";
import { getAllProject } from "redux/actions/admin/getAllProject";
import { updateProject } from "redux/actions/admin/updateProject";
import { getAllUserAssignedProject } from "redux/actions/admin/getAllUserAssignedProject";

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

function createData(
  projectID,
  title,
  description,
  managerName,
  startDate,
  dueDate,
  actions
) {
  return {
    projectID,
    title,
    description,
    managerName,
    startDate,
    dueDate,
    actions,
  };
}

export const ContentModal = ({ setOpenModal, setData, data }) => {
  const [error, setError] = React.useState({});
  console.log({ data });
  const [form, setForm] = React.useState({
    title: data.title,
    description: data.description,
    dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
    idOfAdmin: data.idOfAdmin,
    projectId: data.projectId,
  });
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.title)) {
      errorState.title = "Please enter title";
    }
    if (isEmpty(form.description)) {
      errorState.description = "Please enter descriptions";
    }
    if (isEmpty(form.dueDate)) {
      errorState.dueDate = "Please enter due date";
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
      title: form.title,
      description: form.description,
      dueDate: moment(form.dueDate).format("YYYY/MM/DD"),
      idOfAdmin: form.idOfAdmin,
      id_project: form.projectId,
    };

    console.log({ formData });

    updateProject(formData, (res) => {
      if (res.success) {
        toast.success("Edit project successfully");
        let arr = [];
        getAllProject((response) => {
          if (response.success) {
            response.data.forEach((item) => {
              arr.push(
                createData(
                  item.projectId,
                  item.title,
                  item.description,
                  item.managerName,
                  "PhanTrongDuc,NguyenHong,PhanThanhBinh,Kien,Sang",
                  item.startDate,
                  item.dueDate,
                  "More"
                )
              );
            });
            setData(arr);
          } else {
            toast.error(response.message);
          }
        });
      } else {
        toast.error(res.message);
      }
    });
    setOpenModal(false);
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

  const [interns, setInterns] = useState([]);

  useEffect(() => {
    getAllUserAssignedProject(data.projectId.toString(), (res) => {
      if (res.success) {
        setInterns(res.data.map((item) => item.name));
      } else {
        toast.error(res.message);
      }
    });
  }, [data]);

  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        <ReForm className="re__form">
          <div>
            <label>Project Name</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "title",
                placeholder: "Project Name",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.title,
                disabled: false,
              }}
              error={error.title}
            />
          </div>
          <div>
            <label>Descriptions</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "description",
                placeholder: "Descriptions",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.description,
                disabled: false,
              }}
              error={error.description}
            />
          </div>
          <div>
            <label>Due date</label>
            <FormBox
              propsInput={{
                type: "date",
                name: "dueDate",
                placeholder: "Due date",
                onChange: handleChange,
                onFocus: handleFocus,
                min: moment(Date.now()).format("YYYY-MM-DD"),
                value: form.dueDate,
                disabled: false,
              }}
              error={error.dueDate}
            />
          </div>

          <div>
            <label>Assigned users</label>
            <Input
              type="select"
              name="assignedUsers"
              id="assignedUsers"
              placeholder="Assigned users"
              onChange={handleChange}
              onFocus={handleFocus}
              value={interns[0]}
              disabled={false}
            >
              {interns.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Input>
            <span
              className="invalid-feedback"
              style={{ display: "block", marginLeft: 15 }}
            >
              {error.assignedUsers}
            </span>
          </div>

          <button className="btn--save align__center" style={{ marginTop: 20 }}>
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

const ModalEditProject = ({ setOpenModal, title, setData, infoSelected }) => {
  return (
    <ModalAddAccountUserContainer className="modal__add__user__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => <HeaderModal close={setOpenModal} title={title} />}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentModal
            setOpenModal={setOpenModal}
            setData={setData}
            data={infoSelected}
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
export default ModalEditProject;
