import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addLeaveSchedule } from "redux/actions/intern/addLeaveSchedule";
function CalenderTable() {
  const [schedules, setSchedules] = useState([]);
  const MAP = [
    "Leave", // shitf = 0
    "Afternoon", // shitf = 1
    "Morning", // shitf = 2
    "All day", // shitf = 3
  ];

  const curr = new Date();
  const [firstDateWeek, setFirstDateWeek] = useState(
    new Date().getDate() - new Date().getDay()
  );

  useEffect(() => {
    let array = [];
    [1, 2, 3, 4, 5].forEach((item) => {
      let date = moment(new Date(curr.setDate(firstDateWeek + item))).format(
        "YYYY/MM/DD"
      );
      array.push({
        leave_date: date,
        shift_date: 3,
      });
    });
    setSchedules(array);
    // eslint-disable-next-line
  }, [firstDateWeek]);

  useEffect(() => {
    if ((new Date()).getTime() > new Date(curr.setDate(firstDateWeek + 5)).getTime()) {
      setFirstDateWeek(firstDateWeek + 7);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    if (
      new Date(curr.setDate(firstDateWeek + 6)).getTime() === (new Date()).getTime() ||
      new Date(curr.setDate(firstDateWeek + 7)).getTime() === (new Date()).getTime()
    ) {
      toast.error("Today you can not edit your schedule!");
      console.log(schedules);
      return;
    }
    console.log(schedules);
    schedules.forEach((element, index) => {
      const formData = {
        shift_date: element.shift_date,
        leave_date: element.leave_date,
        reason_content: "",
      };
      console.log(formData);
      addLeaveSchedule(formData, (res) => {
        // if (res.success) {
        //   toast.success("Send schedule successfully");
        // } else {
        //   toast.error(res.message);
        // }
      });
    });
    //call api create schedule
    toast.success("Send schedule successfully");
  };

  function handleChange(event, item) {
    let arr = [...schedules];

    arr.forEach((element, index) => {
      if (element.leave_date === item.leave_date) {
        arr[index].shift_date = MAP.findIndex((e) => e === event.target.value);
      }
    });
    setSchedules(arr);
  }
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
                  <label>{item.leave_date}</label>
                  <select onChange={(event) => handleChange(event, item)}>
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
          <button className="btn-send" onClick={handleSubmit}>
            Submit
          </button>
        </center>
      </div>
    </div>
  );
}

export default CalenderTable;
