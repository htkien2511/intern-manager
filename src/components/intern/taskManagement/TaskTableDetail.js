// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTE_TASK_MANAGEMENT_DETAIL } from "../../../utils/routes";
import { getTaskProjectIntern } from "redux/actions/intern/getTaskProjectIntern";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
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
                    "STT",
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
                        {moment(new Date(item.createDate)).format("DD-MM-YYYY")}
                      </td>
                      <td>{item.difficulty}</td>
                      <td>
                        <NavLink
                          activeClassName="--active"
                          to={ROUTE_TASK_MANAGEMENT_DETAIL}
                        >
                          <p>{item.isDone ? "Done" : "In Progess"}</p>
                        </NavLink>
                      </td>
                      <NavLink
                        activeClassName="--active"
                        to={ROUTE_TASK_MANAGEMENT_DETAIL}
                      >
                        <p>Feedback</p>
                      </NavLink>
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
