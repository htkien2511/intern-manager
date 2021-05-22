// import DropPanel from "components/common/core/DropPanel";
import React, { useEffect } from "react";
import { getAuth } from "utils/helpers";
import { NavLink } from "react-router-dom";
// import { ROUTE_TASK_MANAGEMENT } from "../../../utils/routes";
import { getProjectIntern } from "redux/actions/intern/getProjectIntern";
import moment from "moment";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import { Empty } from "antd";

function TaskManagement() {
  const [form, setForm] = React.useState(null);
  useEffect(() => {
    getProjectIntern(getAuth().id, (output) => {
      if (!output.data) return;
      setForm(output.data);
    });
  }, []);

  const storeGetProjectIntern = useSelector((store) => store.getProjectIntern);
  return (
    <>
      <div className="task-management">
        <h2>List Projects</h2>
      </div>
      {storeGetProjectIntern.loading && <SpinLoading />}
      {form ? (
        <div className="task-management">
          {form.length > 0 ? (
            <div>
              <table>
                <thead>
                  <tr>
                    {[
                      "Project ID",
                      "Project",
                      "Created Date",
                      "Due Date",
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
                        <td>{item.projectId}</td>
                        <td>{item.title}</td>
                        <td>
                          {moment(new Date(item.startDate)).format(
                            "YYYY/MM/DD"
                          )}
                        </td>
                        <td>
                          {moment(new Date(item.dueDate)).format("YYYY/MM/DD")}
                        </td>
                        <td>
                          <NavLink
                            activeClassName="--active"
                            to={`/projects/projectId=${item.projectId}`}
                          >
                            <p>See details</p>
                          </NavLink>
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
      ) : (
        <Empty />
      )}
    </>
  );
}

export default TaskManagement;
