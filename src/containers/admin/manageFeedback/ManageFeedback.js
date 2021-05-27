import CustomizedModal from "components/common/core/CustomizeModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllFeedbacksByTaskID } from "redux/actions/admin/getAllFeedbacksByTaskID";
import { toast } from "react-toastify";
import { Empty, Input } from "antd";
import AvatarBlock from "components/common/core/AvatarBlock";
import moment from "moment";
import { deleteFeedback } from "redux/actions/admin/deteteFeedback";
import { addFeedback } from "redux/actions/admin/addFeedback";
import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "element-react";
import { IconButton } from "@material-ui/core";
import { FormBox } from "components/common";
import { getAuth } from "utils/helpers";
import { updateFeedback } from "redux/actions/admin/updateFeedback";

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

export const ContentModal = ({ setOpenModal, task }) => {
  const [feedbacks, setFeedbacks] = useState();

  const [showButtonSave, setShowButtonSave] = useState(false);
  const handleSubmitForm = (event) => {
    event.preventDefault();
    setOpenModal(false);
  };
  useEffect(() => {
    getAllFeedbacksByTaskID(task.taskId, (res) => {
      if (res.success) {
        if (!res.data) return;
        let arr = [];
        res.data.forEach((_item) => {
          arr.push({
            date: _item.date,
            feedbackContent: _item.feedbackContent,
            feedbackId: _item.feedbackId,
            user: _item.user,
            userId: Number(_item.userId),
            activeContent: false,
          });
        });
        setFeedbacks(arr);
      } else {
        toast.error(res.message);
      }
    });
  }, [task]);

  const handleDeleteFeedback = (id) => {
    deleteFeedback(id, (res) => {
      if (res.success) {
        setFeedbacks(feedbacks.filter((d) => d.feedbackId !== id));
      } else {
        toast.error(res.message);
      }
    });
  };

  const [contentFeedback, setContentFeedback] = useState("");

  function handleChange(event) {
    setContentFeedback(event.target.value);
  }

  function handleEditFeedback(feedback) {
    let temp = [...feedbacks];
    temp.forEach((item, index) => {
      if (item.feedbackId === feedback.feedbackId) {
        item.activeContent = true;
      }
    });
    setFeedbacks(temp);
  }

  function handleUpdateFeedback(feedback) {
    const input = {
      feedback_id: feedback.feedbackId,
      feedback_content: feedback.feedbackContent.trim(),
    };

    updateFeedback(input, (res) => {
      if (!res.success) {
        toast.error(res.message || "Updated failed");
      } else {
        let temp = [...feedbacks];
        temp.forEach((item, index) => {
          if (item.feedbackId === feedback.feedbackId) {
            item.activeContent = false;
          }
        });
        setFeedbacks(temp);
      }
    });
  }

  function handleChangeUpdateFeedback(event, feedback) {
    let temp = [...feedbacks];
    temp.forEach((item, index) => {
      if (item.feedbackId === feedback.feedbackId) {
        item.feedbackContent = event.target.value;
      }
    });
    setFeedbacks(temp);
  }

  return (
    <div className="content__container" onSubmit={handleSubmitForm}>
      <div className="content__inner">
        {(feedbacks && feedbacks.length) > 0 ? (
          feedbacks.map((_item, index) => (
            <div
              key={index}
              className="flex flex-col block_feedbacks"
              style={{
                marginTop: 20,
                paddingBottom: 10,
              }}
            >
              <div className="flex items-center space-between">
                <div
                  className="flex flex-col"
                  style={{ width: "100%", position: "relative" }}
                >
                  <div className="flex items-center">
                    <div style={{ marginRight: 8 }}>
                      <AvatarBlock users_list={[_item.user]} />
                    </div>
                    <FormBox
                      propsInput={{
                        type: "textarea",
                        name: "content",
                        className: "input__content",
                        placeholder: "Content",
                        value: _item.feedbackContent,
                        onChange: (e) => handleChangeUpdateFeedback(e, _item),
                        disabled: !_item.activeContent,
                      }}
                    />
                  </div>
                  <div
                    className="flex items-center space-between"
                    style={{ marginTop: _item.activeContent ? "-10px" : 0 }}
                  >
                    {_item.activeContent && (
                      <button
                        className="button button--success"
                        style={{ color: "white", marginLeft: "45px" }}
                        onClick={() => handleUpdateFeedback(_item)}
                      >
                        Save
                      </button>
                    )}
                    <span
                      style={{
                        color: "#556f8a;",
                        fontSize: 13,
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      {_item.date &&
                        moment(_item.date).format("DD/MM/YYYY  HH:mm:ss")}
                    </span>
                  </div>
                </div>

                {Number(_item.userId) === getAuth().id && (
                  <div className="flex items-center">
                    <Tooltip>
                      <IconButton>
                        <EditOutlined
                          style={{ fontSize: 14 }}
                          onClick={() => handleEditFeedback(_item)}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip>
                      <IconButton
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: "50%",
                          border: "none",
                          marginLeft: 3,
                        }}
                        onClick={() => handleDeleteFeedback(_item.feedbackId)}
                      >
                        <span style={{ fontSize: 16 }}>x</span>
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
        <div className="flex flex-col">
          <Input
            placeholder="Content feedback"
            value={contentFeedback}
            onChange={handleChange}
            style={{
              marginBottom: 10,
              marginTop: 15,
              borderRadius: 5,
              fontSize: 17,
            }}
            onFocus={() => {
              setShowButtonSave(true);
            }}
          />
          {showButtonSave && (
            <div className="flex items-center">
              <button
                className="button button--secondary"
                onClick={() => {
                  if (contentFeedback) {
                    addFeedback(
                      {
                        task_id: task.taskId,
                        feedback_content: contentFeedback.trim(),
                      },
                      (result) => {
                        if (result.success) {
                          getAllFeedbacksByTaskID(task.taskId, (r) => {
                            if (r.success) {
                              setFeedbacks(r.data);
                              setShowButtonSave(false);
                              setContentFeedback("");
                            } else {
                              toast.error(r.message);
                            }
                          });
                        } else {
                          toast.error(result.message || "Send feedback failed");
                        }
                      }
                    );
                  } else {
                    toast.warn("Please enter feedback!");
                  }
                }}
              >
                Send
              </button>
              <button
                className="button"
                style={{
                  background: "red",
                  color: "white",
                  marginLeft: 5,
                }}
                onClick={() => {
                  setShowButtonSave(false);
                  setContentFeedback("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ManageFeedback = ({ setOpenModal, title, task }) => {
  return (
    <ModalFeedbackContainer className="modal__add__user__container">
      <CustomizedModal>
        <CustomizedModal.Header>
          {() => <HeaderModal close={setOpenModal} title={title} />}
        </CustomizedModal.Header>
        <CustomizedModal.Content>
          <ContentModal setOpenModal={setOpenModal} task={task} />
        </CustomizedModal.Content>
      </CustomizedModal>
    </ModalFeedbackContainer>
  );
};

const ModalFeedbackContainer = styled.div`
  .modal__inner {
    width: 600px !important;
    .modal__header {
      .header__container {
        .header__inner {
          padding: 10px 20px;
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
      max-height: 600px !important;
      overflow-y: scroll;
      .content__inner {
        & > div {
          &:not(:last-child) {
            border-bottom: 0.5px solid #e4e1e1;
          }
          .btn-cancel {
            :hover {
              background: rgb(215, 227, 231) !important;
            }
          }
        }
        padding: 10px 20px;
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
export default ManageFeedback;
