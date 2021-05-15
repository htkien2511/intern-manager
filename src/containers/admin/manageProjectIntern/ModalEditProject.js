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
import { getAllUser } from "redux/actions/admin/getAllUser";
import { Select, Tag } from "antd";
import { assignUsersIntoProject } from "redux/actions/admin/assignUsersIntoProject";
import { getAllManager } from "redux/actions/admin/getAllManager";

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
  usersAssigned,
  startDate,
  dueDate,
  actions
) {
  return {
    projectID,
    title,
    description,
    managerName,
    usersAssigned,
    startDate,
    dueDate,
    actions,
  };
}

export const ContentModal = ({ setOpenModal, setData, data }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    title: data.title,
    description: data.description,
    dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
    idOfAdmin: data.idOfAdmin,
    projectId: data.projectId,
    usersAssigned: data.usersAssigned,
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
    if (isEmpty(form.idOfAdmin + "")) {
      errorState.idOfAdmin = "Please enter leader";
    }
    if (!usersSelected.length) {
      errorState.assignedUsers = "Please assigned intern";
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

    updateProject(formData, (res) => {
      if (res.success) {
        toast.success("Edit project successfully");
        let arr = [];
        assignUsersIntoProject(
          {
            id_project: form.projectId,
            id_user: usersSelected,
          },
          (r) => {
            if (r.success) {
              getAllProject((response) => {
                if (response.success) {
                  response.data.forEach((item) => {
                    arr.push(
                      createData(
                        item.projectId,
                        item.title,
                        item.description,
                        item.managerName,
                        item.userAssignee,
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
              toast.error(r.message);
            }
          }
        );
      } else {
        toast.error(res.message);
      }
    });
    setOpenModal(false);
  };
  const handleChange = (event) => {
    if (event.target.name === "idOfAdmin") {
      setForm({
        ...form,
        [event.target.name]: Number(
          (event.target.value + "").split(" - ")[0].toString().match(/\d+/g)[0]
        ),
      });
      return;
    }
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setError({ ...error, assignedUsers: "" });
  };

  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getAllManager((res) => {
      if (res.success) {
        setLeaders(res.data);
        setForm({ ...form, idOfAdmin: res.data.map((item) => item.id)[0] });
      } else {
        toast.error(res.message);
      }
    });
    // eslint-disable-next-line
  }, []);

  const [interns, setInterns] = useState([]);

  useEffect(() => {
    getAllUser((res) => {
      if (res.success) {
        setInterns(res.data);
      } else {
        toast.error(res.message);
      }
    });
  }, []);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (!interns.length) return;
    let arr = [];
    interns.forEach((item) => {
      let option = {
        value: `Id: ${item.id} - Name: ${item.name}`,
      };
      arr.push(option);
    });
    setOptions(arr);
  }, [interns]);

  function tagRender(props) {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  const [usersSelected, setUsersSelected] = useState(
    data.usersAssigned.map((item) => item.id.toString())
  );

  const handleChangeUsersAssignee = (value, options) => {
    let arr = [];
    options.forEach((o) => {
      arr.push((o.value + "").split(" - ")[0].toString().match(/\d+/g)[0]);
    });
    setUsersSelected(arr.join(","));
  };

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
            <label>Select leader for project</label>
            <Input
              type="select"
              name="idOfAdmin"
              id="leader"
              placeholder="Leader"
              onChange={handleChange}
              onFocus={handleFocus}
              value={
                leaders
                  .filter((item) => item.id === form.idOfAdmin)
                  .find((e, idx) => idx === 0) &&
                `Id: ${form.idOfAdmin} - Name: ${
                  leaders
                    .filter((item) => item.id === form.idOfAdmin)
                    .find((e, idx) => idx === 0).name
                }`
              }
              disabled={false}
            >
              {leaders.map((item, index) => (
                <option
                  key={index}
                >{`Id: ${item.id} - Name: ${item.name}`}</option>
              ))}
            </Input>
            <span
              className="invalid-feedback"
              style={{ display: "block", marginLeft: 15 }}
            >
              {error.idOfAdmin}
            </span>
          </div>

          <div>
            <label>Assigned users</label>
            <Select
              mode="multiple"
              showArrow
              name="assignedUsers"
              dropdownClassName="dropdown__selection"
              placeholder="Users assigned"
              defaultValue={data.usersAssigned.map(
                (item) => `Id: ${item.id} - Name: ${item.name}`
              )}
              tagRender={tagRender}
              onChange={(value, options) =>
                handleChangeUsersAssignee(value, options)
              }
              options={options}
              onFocus={handleFocus}
              maxTagCount={3}
            />
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
