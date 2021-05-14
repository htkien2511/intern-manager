// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTE_TASK_MANAGEMENT_DETAIL } from "../../../utils/routes";
import { getTaskProjectIntern } from "redux/actions/intern/getTaskProjectIntern";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import { toast } from "react-toastify";
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
  
  // const handleChangeStatus = (event) => {
  //   console.log("abc");
  //   // const formData = {
  //   //   oldPassword: formChangePass.oldPassword,
  //   //   newPassword: formChangePass.newPassword,
  //   // };
  //   // changePassword(formData, (res) => {
  //   //   if (res.success) {
  //   //     toast.success("Changed password successfully");
  //   //   } else {
  //   //     toast.error(res.message);
  //   //   }
  //   // });
  // };
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
                        {moment(new Date(item.createDate)).format("DD-MM-YYYY")}
                      </td>
                      <td>{item.difficulty}</td>
                      <td>
                        <button className="button button--secondary"><p>{item.isDone ? "Done" : "In Progess"}</p></button>
                        {/* <NavLink
                          activeClassName="--active"
                          to={ROUTE_TASK_MANAGEMENT_DETAIL}
                        >
                          <p>{item.isDone ? "Done" : "In Progess"}</p>
                        </NavLink> */}
                      </td>
                     <td>
                     <NavLink
                        activeClassName="--active"
                        // onClick={handleChangeStatus}
                        to={ROUTE_TASK_MANAGEMENT_DETAIL}
                      >
                        <p>Feedback</p>
                      </NavLink>
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
