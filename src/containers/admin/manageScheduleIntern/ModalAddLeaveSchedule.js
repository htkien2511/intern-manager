import { FormBox } from "components/common";
import CustomizedModal from "components/common/core/CustomizeModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form as ReForm, Input } from "reactstrap";
import { isEmpty } from "validator";
import moment from "moment";
import { createSchedule } from "redux/actions/admin/createSchedule";
import { getScheduleUserID } from "redux/actions/admin/getScheduleUserID";
import { toast } from "react-toastify";

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

export const ContentModal = ({ setOpenModal, setData, userID }) => {
  const MAP = {
    "All day": 0,
    Morning: 1,
    Afternoon: 2,
  };

  const [workingWeek, setWorkingWeek] = useState([]);
  const curr = new Date();
  const [firstDateWeek, setFirstDateWeek] = useState(
    new Date().getDate() -
      new Date().getDay() +
      (new Date().getDay() === 0 ? -6 : 1)
  );

  useEffect(() => {
    if (curr.getTime() > new Date(curr.setDate(firstDateWeek + 4)).getTime()) {
      setFirstDateWeek(firstDateWeek + 7);
      let array = [];
      [1, 2, 3, 4, 5].forEach((item) => {
        let date = new Date(curr.setDate(firstDateWeek + 6 + item));
        array.push(date);
      });
      setWorkingWeek(array);
    }
    // eslint-disable-next-line
  }, []);

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    shift: "All day",
    leave_date: "",
    reason_content: "",
  });

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.shift)) {
      errorState.shift = "Please choice session leave";
    }
    if (isEmpty(form.leave_date)) {
      errorState.leave_date = "Please enter leave date";
    }
    if (isEmpty(form.reason_content)) {
      errorState.reason_content = "Please enter reason of absence";
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
      shift: MAP[form.shift],
      leave_date: moment(form.leave_date).format("YYYY/MM/DD"),
      reason_content: form.reason_content,
    };

    console.log({ formData });

    createSchedule(formData, (res) => {
      if (res.success) {
        getScheduleUserID(userID, (r) => {
          if (r.success) {
            toast.success("Created schedule successfully!");
            setData(r.data);
          } else {
            toast.error(r.message);
          }
        });
        toast.success("Created schedule successfully");
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

  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        <ReForm className="re__form">
          <div>
            <label>Choice date</label>
            {/* handle min max date (new week) */}
            <FormBox
              propsInput={{
                type: "date",
                name: "leave_date",
                placeholder: "Leave date",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.leave_date,
                min: moment(workingWeek[0]).format("YYYY-MM-DD"),
                max: moment(workingWeek[4]).format("YYYY-MM-DD"),
                disabled: false,
              }}
              error={error.leave_date}
            />
          </div>
          <div>
            <label>Choice shift</label>
            <Input
              type="select"
              name="shift"
              id="shift"
              placeholder="Shift"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.shift}
              disabled={false}
            >
              {["All day", "Morning", "Afternoon"].map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Input>
            <span
              className="invalid-feedback"
              style={{ display: "block", marginLeft: 15 }}
            >
              {error.shift}
            </span>
          </div>

          <div>
            <label>Reason of absence</label>
            <FormBox
              propsInput={{
                type: "text",
                name: "reason_content",
                placeholder: "Reason of absence",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.reason_content,
                disabled: false,
              }}
              error={error.reason_content}
            />
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

const ModalAddLeaveSchedule = ({ setOpenModal, title, setData, userID }) => {
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
            userID={userID}
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
export default ModalAddLeaveSchedule;
