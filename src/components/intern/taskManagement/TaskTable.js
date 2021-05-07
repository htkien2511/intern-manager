// import DropPanel from "components/common/core/DropPanel";
import React from "react";
import { taskListData } from "utils/mockData";
import { NavLink } from "react-router-dom";
import { ROUTE_TASK_MANAGEMENT_DETAIL } from "../../../utils/routes";
function TaskManagement() {
  return (
    <div className="task-management">
      <h2>Project Management</h2>
      <div>
        <table>
          <thead>
            <tr>
              {["STT", "Project", "Start day", "End Date","Actions"].map(
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
                  <td>Làm Web Thực tập</td>
                  <td>21/1/2021</td>
                  <td>3/2/2021</td>
                  <td>
                  <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT_DETAIL}>
                    <p>Detail</p>
                  </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskManagement;
