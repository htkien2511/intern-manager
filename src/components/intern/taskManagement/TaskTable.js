import DropPanel from "components/common/core/DropPanel";
import React from "react";
import { taskListData } from "utils/mockData";

function TaskManagement() {
  return (
    <div className="task-management">
      <h2>Project Management</h2>
      <div>
        <table>
          <thead>
            <tr>
              {["STT", "Project", "Tasks", "Start day", "End Date"].map(
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
                  <td style={{ width: 450 }}>
                    {item.listNameTask.map((item, index) => {
                      return (
                        <DropPanel key={index}>
                          <DropPanel.Trigger>
                            {({ toggle, isShowing }) => (
                              <div className="work">
                                <input type="checkbox" checked={item.checked}/>
                                <label style={{ marginRight: 10 }}>{item.task}</label>
                                <i className={`fi-rr-angle-small-${isShowing ? "down" : "up"}`} onClick={toggle} style={{ cursor: "pointer" }} />
                              </div>
                            )}
                          </DropPanel.Trigger>
                          <DropPanel.Content>
                            {() =>
                              item.taskDetails && item.taskDetails.map((content, index) => {
                                return (
                                  <div key={index}>
                                    {/* <input type="checkbox" checked={content.checked} onChange={() => handleChangeCheckTask(content)} /> */}
                                    {content.value}
                                  </div>
                                );
                              })
                            }
                          </DropPanel.Content>
                        </DropPanel>
                      );
                    })}
                  </td>
                  <td>21/1/2021</td>
                  <td>3/2/2021</td>
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
