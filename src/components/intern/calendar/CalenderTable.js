import moment from "moment";
import React, { useEffect, useState } from "react";
function CalenderTable() {
  const [schedules, setSchedules] = useState([]);
  const MAP = [
    "Leave", // shitf = 0
    "Afternoon", // shitf = 1
    "Morning", // shitf = 2
    "All day", // shitf = 3  
  ];
  useEffect(() => {
    let curr = new Date(); 
    let first = curr.getDate() - curr.getDay();
    let array = [];
    [1,2,3,4,5].forEach(item => {
      let date = moment(new Date(curr.setDate(first+item))).format("DD-MM-YYYY");
      array.push({
        leave_date: date,
        shitf: 3, 
      });
    })
    setSchedules(array);
  },[]);
  console.log(schedules);
  return (
    <div className="calendar">
      <h2>Sign up for a calendar</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            {schedules.map((item, index) => (
              <td key={index}>
                <label>{item}</label>
                <select>
                  <option value={MAP[3]}>All day</option>
                  <option value={MAP[2]}>Morning</option>
                  <option value={MAP[1]}>Afternoon</option>
                  <option value={MAP[0]}>Leave</option>
                </select>
              </td>
            ))}
            </tr>
          </tbody>
        </table>
        <center>
          <button className="btn-send">Submit</button>
        </center>
      </div>
    </div>
  );
}

export default CalenderTable;
