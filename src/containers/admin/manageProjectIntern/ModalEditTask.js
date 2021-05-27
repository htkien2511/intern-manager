import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form as ReForm, Input } from "reactstrap";
import { isEmpty } from "validator";
import moment from "moment";
import { getAllUserAssignedProject } from "redux/actions/admin/getAllUserAssignedProject";
import { Select, Tag } from "antd";
import { updateTask } from "redux/actions/admin/updateTask";
import { toast } from "react-toastify";
import { getAllTasksByProjectID } from "redux/actions/admin/getAllTaskByProjectID";

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

export const ContentModal = ({ setOpenModal, projectId, setData, input }) => {
  const DIFFICULTY = { Hard: 1, Normal: 2, Easy: 3 };

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    title: "" || input.title,
    description: "" || input.description,
    dueDate: input.dueDate ? moment(input.dueDate).format("YYYY-MM-DD") : null,
    difficultId: input.difficulty,
    isDone: "" || input.isDone,
    point: "" || Number(input.point),
    users_assignee: "" || input.usersAssignee,
  });

  const [usersAssignedInProject, setUsersAssignedInProject] = useState([]);

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

  useEffect(() => {
    getAllUserAssignedProject(projectId, (res) => {
      if (res.success) {
        setUsersAssignedInProject(res.data);
      }
    });
  }, [projectId]);

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.title)) {
      errorState.title = "Please enter task name";
    }
    if (isEmpty(form.description)) {
      errorState.description = "Please enter descriptions";
    }
    if (!form.dueDate) {
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
      task_id: input.taskId,
      title: form.title,
      description: form.description,
      due_date: moment(form.dueDate).format("YYYY/MM/DD"),
      difficulty: DIFFICULTY[form.difficultId],
      done: form.isDone,
      point: parseFloat(form.point) || 0,
      users_assignee: form.users_assignee,
    };

    updateTask(formData, (res) => {
      if (res.success) {
        getAllTasksByProjectID(projectId, (r) => {
          if (r.success) {
            toast.success("Update task successfully!");
            setData(r.data.sort((a, b) => (a.taskId > b.taskId ? 1 : -1)));
          } else {
            toast.error(r.message);
          }
        });
      } else {
        toast.error(res.message);
      }
    });
    setOpenModal(false);
  };
  const MAP = { Done: true, Progressing: false };
  const handleChange = (event) => {
    if (event.target.name === "status") {
      setForm({ ...form, isDone: MAP[event.target.value] });
      return;
    }
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (!(usersAssignedInProject && usersAssignedInProject.length)) return;
    let arr = [];
    usersAssignedInProject.forEach((item) => {
      let option = {
        value: `Id: ${item.id} - Name: ${item.name}`,
      };
      arr.push(option);
    });
    setOptions(arr);
  }, [usersAssignedInProject]);

  const handleChangeUsersAssignee = (value, options) => {
    let arr = [];
    options.forEach((o) => {
      let id = Number(
        (o.value + "").split(" - ")[0].toString().match(/\d+/g)[0]
      );
      let name = usersAssignedInProject.find((item) => item.id === id).name;
      arr.push({
        id: id,
        name: name,
      });
    });
    setForm({ ...form, users_assignee: arr });
  };

  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        <ReForm className="re__form">
          <div>
            <label>Task Name</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "title",
                placeholder: "Task Name",
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
                type: "textarea",
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
                value: form.dueDate || "",
                min: moment(Date.now()).format("YYYY-MM-DD"),
                disabled: false,
              }}
              error={error.dueDate}
            />
          </div>

          <div>
            <label>Level</label>
            <Input
              type="select"
              name="difficultId"
              id="difficultId"
              placeholder="Level"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.difficultId}
              disabled={false}
            >
              {["Easy", "Normal", "Hard"].map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Input>
            <span
              className="invalid-feedback"
              style={{ display: "block", marginLeft: 15 }}
            >
              {error.difficultId}
            </span>
          </div>

          <div>
            <label>Point</label>
            <FormBox
              propsInput={{
                type: "number",
                name: "point",
                min: "0",
                max: "10",
                step: "0.5",
                placeholder: "Point",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.point || 0,
                disabled: false,
              }}
              error={error.point}
            />
          </div>

          <div>
            <label>Status</label>
            <Input
              type="select"
              name="status"
              id="status"
              placeholder="Status"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.isDone ? "Done" : "Progressing"}
              disabled={false}
            >
              {["Done", "Progressing"].map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Input>
            <span
              className="invalid-feedback"
              style={{ display: "block", marginLeft: 15 }}
            >
              {error.isDone}
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
              defaultValue={
                input.usersAssignee &&
                input.usersAssignee.map(
                  (item) => `Id: ${item.id} - Name: ${item.name}`
                )
              }
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

const ModalEditTask = ({ setOpenModal, title, setData, projectId, input }) => {
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
            projectId={projectId}
            input={input}
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
export default ModalEditTask;
