import React from "react";
function CalenderTable() {
  return (
    <div className="calendar">
      <h2>Sign up for a calendar</h2>
      <div className="select-time">
        <label>Choose time</label>
        <select>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Tolal</th>
              <th>Overtime</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>40</td>
              <td>0</td>
              <td id="Monday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Tuesday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Wednesday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Thursday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Friday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Saturday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
              <td id="Sunday">
                <label>8</label>
                <select>
                  <option value="All day">All day</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </td>
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
