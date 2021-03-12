import React from "react";
function TaskManagement() {
  return(
        <div className="task-management">
            <h2>Task Management</h2>
            <div>
                <table>
                    <tr>
                        <th>STT</th>
                        <th>Task</th>
                        <th>Works</th>
                        <th>Start Day</th>
                        <th>End Date</th>
                    </tr>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            Làm Web Thực tập
                        </td>
                        <td>
                            <div className="work">
                                <input type="checkbox" value="Cv1" />
                                <label>CV1</label>
                            </div>
                            <div  className="work">
                                <input type="checkbox" value="Cv2" />
                                <label>CV2</label>
                            </div>
                        </td>
                        <td>
                            21/1/2021
                        </td>
                        <td>
                            3/2/2021
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            Làm Web Thực tập
                        </td>
                        <td>
                            <div className="work">
                                <input type="checkbox" value="Cv1" />
                                <label>CV1</label>
                            </div>
                            <div  className="work">
                                <input type="checkbox" value="Cv2" />
                                <label>CV2</label>
                            </div>
                        </td>
                        <td>
                            21/1/2021
                        </td>
                        <td>
                            3/2/2021
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            Làm Web Thực tập
                        </td>
                        <td>
                            <div className="work">
                                <input type="checkbox" value="Cv1" />
                                <label>CVvvvvvvvvvvvvvvvvvvvvvvvvvvv1</label>
                            </div>
                            <div  className="work">
                                <input type="checkbox" value="Cv2" />
                                <label>CVvvvvvvvvvvvvvvvvvvvvvvvvvvv2</label>
                            </div>
                        </td>
                        <td>
                            21/1/2021
                        </td>
                        <td>
                            3/2/2021
                        </td>
                    </tr>
                </table>
            </div>    
        </div>
        
  );
}

export default TaskManagement;
