// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { getAuth } from "utils/helpers";
import { NavLink } from "react-router-dom";
// import { ROUTE_TASK_MANAGEMENT } from "../../../utils/routes";
import { getProjectIntern } from "redux/actions/intern/getProjectIntern";
import moment from "moment";

function TaskManagement() {
  const [form, setForm] = React.useState(null);
  useEffect(() => {
    getProjectIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);
  return (
    <>
    {form&&(<div className="task-management">
      <h2>Project Management</h2>
      <div>
        <table>
          <thead>
            <tr>
              {["STT", "Project","abc", "Created Date", "Due Date","Actions"].map(
                (item, index) => {
                  return <th key={index}>{item}</th>;
                }
              )}
            </tr>
          </thead>

          <tbody>
            {form.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.projectId}</td>
                  <td>{item.title}</td>
                  <td>2/5</td>
                  <td>{moment(new Date(item.startDate)).format("DD-MM-YYYY")}</td>
                  <td>{moment(new Date(item.dueDate)).format("DD-MM-YYYY")}</td>
                  <td>
                  <NavLink activeClassName="--active" to={`/taskManagement/project${item.projectId}`}>
                    <p>Detail</p>
                  </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>)}
    </>
  );
}

export default TaskManagement;
