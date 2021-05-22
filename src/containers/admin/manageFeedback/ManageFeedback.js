import CustomizedModal from "components/common/core/CustomizeModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllFeedbacksByTaskID } from "redux/actions/admin/getAllFeedbacksByTaskID";
import { toast } from "react-toastify";
import { Empty, Input } from "antd";
import AvatarBlock from "components/common/core/AvatarBlock";
import moment from "moment";
import { deleteFeedback } from "redux/actions/admin/deteteFeedback";

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

  const [showButtonSave, setShowButtonSave] = useState([]);
  const handleSubmitForm = (event) => {
    event.preventDefault();
    setOpenModal(false);
  };
  useEffect(() => {
    getAllFeedbacksByTaskID(task.taskId, (res) => {
      if (res.success) {
        if (!res.data) return;
        setFeedbacks(res.data);
      } else {
        toast.error(res.message);
      }
    });
  }, [task]);

  useEffect(() => {
    if (!(feedbacks && feedbacks.length)) return;
    let arr = [];
    feedbacks.forEach((item) => {
      arr.push({ id: item.feedbackId, status: false });
    });
    setShowButtonSave(arr);
  }, [feedbacks]);

  const handleDeleteFeedback = (id) => {
    deleteFeedback(id, (res) => {
      if (res.success) {
        setFeedbacks(feedbacks.filter((d) => d.feedbackId !== id));
      } else {
        toast.error(res.message);
      }
    });
  };

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
              <div className="flex items-center">
                <span style={{ color: "blue", fontSize: 17, marginRight: 8 }}>
                  Created at:
                </span>
                <span>
                  {_item.date &&
                    moment(_item.date).format("HH:MM:SS - DD/MM/YYYY ")}
                </span>
              </div>
              <div className="flex items-center">
                <span style={{ color: "blue", fontSize: 17, marginRight: 8 }}>
                  Author:
                </span>
                <AvatarBlock users_list={["Phan Trọng Đức"]} />
              </div>
              <div className="flex flex-col">
                <span style={{ color: "blue", fontSize: 17, marginRight: 8 }}>
                  Content:
                </span>
                <div className="flex items-center space-between">
                  <span key={index}>{_item.feedbackContent}</span>
                  <button
                    className="btn-cancel"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      border: "none",
                      marginLeft: 3,
                      background: "none",
                    }}
                    onClick={() => handleDeleteFeedback(_item.feedbackId)}
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="Content reply"
                  style={{ marginBottom: 10, marginTop: 15, borderRadius: 5 }}
                  onFocus={() => {
                    let arr = [...showButtonSave];
                    arr.forEach((_a, indx) => {
                      if (_a.id === _item.feedbackId) {
                        arr[indx].status = true;
                      } else {
                        arr[indx].status = false;
                      }
                    });
                    setShowButtonSave(arr);
                  }}
                />
                {showButtonSave[index] && showButtonSave[index].status && (
                  <div className="flex items-center">
                    <button className="button button--secondary">Save</button>
                    <button
                      className="button"
                      style={{
                        background: "red",
                        color: "white",
                        marginLeft: 5,
                      }}
                      onClick={() => {
                        let arr = [...showButtonSave];
                        arr[index].status = !arr[index].status;
                        setShowButtonSave(arr);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
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
    height: auto !important;
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
