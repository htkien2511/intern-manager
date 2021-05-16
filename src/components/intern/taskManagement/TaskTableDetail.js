// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTaskProjectIntern } from "redux/actions/intern/getTaskProjectIntern";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import { toast } from "react-toastify";
import { changeStatusTask } from "redux/actions/intern/changeStatusTask";
function TaskManagementDetail() {
  const { projectId } = useParams();
  const [form, setForm] = React.useState(null);
  useEffect(() => {
    getTaskProjectIntern(projectId, (output) => {
      console.log(output);
      if (!output.data) return;
      setForm(output.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeGetTaskProjectIntern = useSelector(
    (store) => store.getTaskProjectIntern
  );

  const handleChangeStatus = (event, item) => {
    const formData = {
      task_id: item.taskId,
      description: item.description,
      title: item.title,
      difficulty: item.difficulty,
      is_done: item.isDone,
      point: item.point,
      due_date: item.dueDate,
      users_assignee: item.usersAssignee,
    };
    console.log(formData);
    changeStatusTask(formData, (res) => {
      if (res.success) {
        toast.success("Changed status successfully");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <>
      <div className="task-management">
        <h2>Manage List Task</h2>
      </div>
      {storeGetTaskProjectIntern.loading && <SpinLoading />}
      {form && (
        <div className="task-management">
          <div>
            <table>
              <thead>
                <tr>
                  {[
                    "Task ID",
                    "Task",
                    "Descrition",
                    "Create at",
                    "Level",
                    "Status",
                    "Actions",
                  ].map((item, index) => {
                    return <th key={index}>{item}</th>;
                  })}
                </tr>
              </thead>

              <tbody>
                {form.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.taskId}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        {moment(new Date(item.createDate)).format("YYYY/MM/DD")}
                      </td>
                      <td>{item.difficulty}</td>
                      <td>
                        <button
                          className="button button--secondary"
                          onClick={(event) => handleChangeStatus(event, item)}
                        >
                          {item.isDone ? "Done" : "In Progess"}
                        </button>
                      </td>
                      <td>
                        <button className="button button--secondary">
                          Feedback
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskManagementDetail;
