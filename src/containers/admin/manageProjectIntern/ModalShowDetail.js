import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React from "react";
import styled from "styled-components";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import moment from "moment";
import { updateTask } from "redux/actions/admin/updateTask";
import { toast } from "react-toastify";
import { getAllTasksByProjectID } from "redux/actions/admin/getAllTaskByProjectID";
import AvatarBlock from "components/common/core/AvatarBlock";

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

  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        <ReForm className="re__form">
          <div>
            <label>Descriptions: </label>
            <FormBox
              propsInput={{
                type: "textarea",
                name: "description",
                placeholder: "Descriptions",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.description,
                disabled: true,
              }}
              error={error.description}
            />
          </div>
          <div>
            <label>Point: </label>
            <span> {form.point}</span>
          </div>

          <div style={{ marginTop: 10 }} className="flex items-center">
            <label style={{ marginRight: 5 }}>Assigned users: </label>
            {input.usersAssignee.length ? (
              <span>
                <AvatarBlock
                  users_list={input.usersAssignee.map((i) => i.name)}
                  maxCount={4}
                />
              </span>
            ) : (
              <span style={{ color: "gray", marginBottom: 5 }}>
                No user assigned
              </span>
            )}
          </div>
        </ReForm>
      </div>
    </div>
  );
};

const ModalShowDetail = ({
  setOpenModal,
  title,
  setData,
  projectId,
  input,
}) => {
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
      background: #c9d7ff;
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
export default ModalShowDetail;
