import { Empty } from "antd";
import SpinLoading from "components/common/core/SpinLoading";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getScheduleUserID } from "redux/actions/admin/getScheduleUserID";
import { updateSchedule } from "redux/actions/admin/updateSchedule";
import { addLeaveSchedule } from "redux/actions/intern/addLeaveSchedule";
import { getAuth } from "utils/helpers";
function CalenderTable() {
  const [schedules, setSchedules] = useState([]);
  const [enabledSubmit, setEnabledSubmit] = useState(false);

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
    getScheduleUserID(getAuth().id, (output) => {
      if (!output.data) {
        let array = [];
        [1, 2, 3, 4, 5].forEach((item) => {
          let date = moment(
            new Date(curr.setDate(firstDateWeek + item))
          ).format("YYYY/MM/DD");
          array.push({
            leave_date: date,
            shift_date: 3,
          });
        });
        setSchedules(array);
      } else {
        let array = [];
        let dem = 1;
        let ar = [];
        output.data.forEach((item) => {
          ar.push({
            id: item.id,
            time: item.time,
            shift: item.shift,
          });
        });
        ar.sort(function (a, b) {
          return a.id - b.id;
        });
        ar.forEach((item) => {
          let date = moment(new Date(curr.setDate(firstDateWeek + dem))).format(
            "YYYY/MM/DD"
          );
          dem++;
          array.push({
            leave_id: item.id,
            leave_date: date,
            shift_date: item.shift,
          });
        });
        setSchedules(array);
      }
    });
    setEnabledSubmit(
      new Date(curr.setDate(firstDateWeek + 6)).getTime() === curr.getTime() ||
        new Date(curr.setDate(firstDateWeek + 7)).getTime() === curr.getTime()
    );
    // eslint-disable-next-line
  }, [firstDateWeek]);

  useEffect(() => {
    if (
      new Date().getTime() > new Date(curr.setDate(firstDateWeek + 6)).getTime()
    ) {
      setFirstDateWeek(firstDateWeek + 7);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    if (
      new Date(curr.setDate(firstDateWeek + 6)).getTime() === curr.getTime() ||
      new Date(curr.setDate(firstDateWeek + 7)).getTime() === curr.getTime()
    ) {
      getScheduleUserID(getAuth().id, (output) => {
        if (!output.data) {
          schedules.forEach((element, index) => {
            const formData = {
              shift_date: element.shift_date,
              leave_date: element.leave_date,
              reason_content: "",
            };
            addLeaveSchedule(formData, (res) => {
              console.log(res);
            });
          });
          toast.success("Send schedule successfully");
        } else {
          schedules.forEach((element) => {
            console.log(element);
            const formData = {
              leave_id: element.leave_id,
              shift: element.shift_date,
              leave_date: element.leave_date,
              reason_content: "",
            };
            updateSchedule(formData, (res) => {
              console.log(res);
            });
          });
          toast.success("Updated schedule successfully");
        }
      });
    } else {
      toast.error("Today you can not edit your schedule!");
      return;
    }
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

  const loadingSchedule = useSelector(
    (store) => store.getScheduleUserID
  ).loading;

  return (
    <div className="calendar">
      {loadingSchedule && <SpinLoading />}
      <h2>Working Calendar</h2>
      <div className="table">
        {schedules.length ? (
          <>
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
                      <select
                        disabled={!enabledSubmit}
                        onChange={(event) => handleChange(event, item)}
                        value={MAP[item.shift_date]}
                      >
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
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

export default CalenderTable;
