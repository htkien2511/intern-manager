// import DropPanel from "components/common/core/DropPanel";
import React from "react";
import { taskListData } from "utils/mockData";
import { NavLink } from "react-router-dom";
import { ROUTE_TASK_MANAGEMENT_DETAIL } from "../../../utils/routes";
function TaskManagementDetail() {
  return (
    <div className="task-management">
      <h2>Project</h2>
      <div>
        <table>
          <thead>
            <tr>
              {["STT", "Task","Descrition","Create at","Assign by","Status"].map(
                (item, index) => {
                  return <th key={index}>{item}</th>;
                }
              )}
            </tr>
          </thead>

          <tbody>
            {taskListData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>Create ForgotPassword Page</td>
                  <td>Create ForgotPassword Page Create ForgotPassword Page</td>
                  <td>28/07/2020</td>
                  <td>John Doe</td>
                  <td>
                  <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT_DETAIL}>
                    <p>In Progress</p>
                  </NavLink>
                  </td>
                </tr>
              );
            })}
            <tr>
                  <td>2</td>
                  <td>Create Form Login</td>
                  <td>Create ForgotPassword Page Create ForgotPassword Page</td>
                  <td>28/07/2020</td>
                  <td>John Doe</td>
                  <td>
                  <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT_DETAIL}>
                    <p>Progressed</p>
                  </NavLink>
                  </td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskManagementDetail;
