// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTE_TASK_MANAGEMENT_DETAIL } from "../../../utils/routes";
import { getTaskProjectIntern } from "redux/actions/intern/getTaskProjectIntern";
import moment from "moment";
function TaskManagementDetail() {
  const {projectId} = useParams();
  const [form, setForm] = React.useState(null);
  useEffect(() => {
    getTaskProjectIntern(projectId, (output) => {
      console.log(output);
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);
  return (
    <>
    {form&&(<div className="task-management">
      <h2>{form[0].projectName}</h2>
      <div>
        <table>
          <thead>
            <tr>
              {["STT", "Task","Descrition","Create at","Level","Status","Actions"].map(
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
                  <td>{item.taskId}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{moment(new Date(item.createDate)).format("DD-MM-YYYY")}</td>
                  <td>{item.difficulty}</td>
                  <td>
                  <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT_DETAIL}>
                    <p>{item.isDone?"Done":"In Progess"}</p>
                  </NavLink>
                  </td>
                  <NavLink activeClassName="--active" to={ROUTE_TASK_MANAGEMENT_DETAIL}>
                    <p>Feedback</p>
                  </NavLink>
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

export default TaskManagementDetail;
