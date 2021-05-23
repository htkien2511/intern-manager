// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskProjectIntern } from "redux/actions/intern/getTaskProjectIntern";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import { toast } from "react-toastify";
import { changeStatusTask } from "redux/actions/intern/changeStatusTask";
import { RollbackOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import { ManageFeedback } from "containers/admin/manageFeedback";
function TaskManagementDetail() {
  const { projectId } = useParams();
  const [form, setForm] = React.useState([]);
  useEffect(() => {
    getTaskProjectIntern(projectId, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeGetTaskProjectIntern = useSelector(
    (store) => store.getTaskProjectIntern
  );

  const handleChangeStatus = (event, item) => {
    let difficulty = 0;
    if (item.difficulty === "Hard") {
      difficulty = 1;
    }
    if (item.difficulty === "Normal") {
      difficulty = 2;
    }
    if (item.difficulty === "Easy") {
      difficulty = 3;
    }
    const formData = {
      task_id: item.taskId,
      description: item.description,
      title: item.title,
      difficulty: difficulty,
      done: !item.isDone,
      point: item.point,
      due_date: moment(new Date(item.dueDate)).format("YYYY/MM/DD"),
      users_assignee: item.usersAssignee,
    };
    changeStatusTask(formData, (res) => {
      if (res.success) {
        let arr = [...form];
        arr
          .filter((i) => i.taskId === item.taskId)
          .forEach((e) => {
            e.isDone = !item.isDone;
          });
        setForm(arr);
      } else {
        toast.error(res.message);
      }
    });
  };

  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const [taskSelected, setTaskSelected] = useState();

  const handleOpenFeedback = (item) => {
    setTaskSelected(item);
    setShowModalFeedback(true);
  };

  const loadingChangeStatus = useSelector(
    (store) => store.changeStatusTask
  ).loading;

  const loadingGetAllFeedback = useSelector(
    (store) => store.getAllFeedbacksByTaskID
  ).loading;
  const loadingDeleteFeedback = useSelector(
    (store) => store.deleteFeedback
  ).loading;

  const loadingCreateFeedback = useSelector(
    (store) => store.addFeedback
  ).loading;

  return (
    <>
      <div className="task-management">
        <div className="block__back-previous-page">
          <RollbackOutlined onClick={() => window.history.back()} />
          <div onClick={() => window.history.back()}>Back to previous page</div>
        </div>
        <h2>List Tasks</h2>
      </div>
      {(storeGetTaskProjectIntern.loading ||
        loadingChangeStatus ||
        loadingGetAllFeedback ||
        loadingDeleteFeedback ||
        loadingCreateFeedback) && <SpinLoading />}
      {form && (
        <div className="task-management">
          {form.length > 0 ? (
            <div>
              <table>
                <thead>
                  <tr>
                    {[
                      "Task ID",
                      "Task",
                      "Descrition",
                      "Create at",
                      "Due date",
                      "Level",
                      "Status",
                      "Actions",
                    ].map((item, index) => {
                      return <th key={index}>{item}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {form.length &&
                    form.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.taskId}</td>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>
                            {moment(new Date(item.createDate)).format(
                              "YYYY/MM/DD"
                            )}
                          </td>
                          <td>
                            {moment(new Date(item.dueDate)).format(
                              "YYYY/MM/DD"
                            )}
                          </td>
                          <td>{item.difficulty}</td>
                          <td>
                            <button
                              className={`button ${
                                item.isDone
                                  ? "button--success"
                                  : "button--secondary"
                              }`}
                              onClick={(event) =>
                                handleChangeStatus(event, item)
                              }
                              style={{ color: "white" }}
                            >
                              {item.isDone ? "Done" : "In Progess"}
                            </button>
                          </td>
                          <td>
                            <button
                              className="button button--secondary"
                              onClick={() => handleOpenFeedback(item)}
                              style={{ background: "gray" }}
                            >
                              Feedback
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      )}
      {showModalFeedback && (
        <ManageFeedback
          setOpenModal={setShowModalFeedback}
          title="List Feedbacks"
          task={taskSelected}
        />
      )}
    </>
  );
}

export default TaskManagementDetail;
