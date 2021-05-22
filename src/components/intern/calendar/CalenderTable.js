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
  const [workingWeek, setWorkingWeek] = useState([]);

  const [enabledSubmit, setEnabledSubmit] = useState(false);

  const MAP = [
    "Leave", // shitf = 0
    "Afternoon", // shitf = 1
    "Morning", // shitf = 2
    "All day", // shitf = 3
  ];

  const curr = new Date();
  const [firstDateWeek, setFirstDateWeek] = useState(
    new Date().getDate() -
      new Date().getDay() +
      (new Date().getDay() === 0 ? -6 : 1)
  );

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    if (!workingWeek.length || !firstDateWeek) return;
    getScheduleUserID(getAuth().id, (output) => {
      if (!output.success || !output.data.length) {
        return;
      }
      const newData = getUniqueListBy(output.data, "time").filter((item) =>
        workingWeek.map((_e) => _e.leave_date).includes(item.time)
      );

      let ar = [];
      newData.forEach((item) => {
        ar.push({
          leave_id: item.id,
          leave_date: item.time,
          shift_date: item.shift,
          reason_content: item.reason,
        });
      });
      ar.sort(function (a, b) {
        return a.leave_id - b.leave_id;
      });
      setSchedules(ar);
    });
    setEnabledSubmit(
      new Date(curr.setDate(firstDateWeek + 6)).getTime() === curr.getTime() ||
        new Date(curr.setDate(firstDateWeek + 7)).getTime() === curr.getTime()
    );
    // eslint-disable-next-line
  }, [firstDateWeek, workingWeek]);

  useEffect(() => {
    if (curr.getTime() > new Date(curr.setDate(firstDateWeek + 4)).getTime()) {
      setFirstDateWeek(firstDateWeek + 7);
      let array = [];
      [1, 2, 3, 4, 5].forEach((item) => {
        let date = moment(
          new Date(curr.setDate(firstDateWeek + 6 + item))
        ).format("YYYY/MM/DD");
        array.push({
          leave_date: date,
          shift_date: 3,
        });
      });
      setWorkingWeek(array);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    if (
      new Date(curr.setDate(firstDateWeek + 6)).getTime() === curr.getTime() ||
      new Date(curr.setDate(firstDateWeek + 7)).getTime() === curr.getTime()
    ) {
      getScheduleUserID(getAuth().id, (output) => {
        if (!output.success) {
          toast.error(output.message);
          return;
        }
        if (!output.data.length) return;
        if (
          !output.data
            .map((_item) => _item.time)
            .includes(schedules[0].leave_date)
        ) {
          schedules.forEach((element, index) => {
            const formData = {
              shift_date: element.shift_date,
              leave_date: element.leave_date,
              reason_content: element.reason_content.trim(),
            };
            addLeaveSchedule(formData, (res) => {
              if (!res.success) {
                toast.error(res.message);
              }
            });
          });
          toast.success("Create schedule new week successfully");
        } else {
          schedules.forEach((element) => {
            const formData = {
              leave_id: element.leave_id,
              shift: element.shift_date,
              leave_date: element.leave_date,
              reason_content: element.reason_content.trim(),
            };
            updateSchedule(formData, (res) => {
              if (!res.success) {
                toast.error(res.message);
              }
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

  function handleChange(event, index) {
    let arr = [...schedules];

    if (event.target.name === "reason") {
      arr[index].reason_content = event.target.value;
    } else {
      arr[index].shift_date = MAP.findIndex((e) => e === event.target.value);
    }
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
                        onChange={(event) => handleChange(event, index)}
                        value={MAP[item.shift_date]}
                      >
                        <option value={MAP[3]}>All day</option>
                        <option value={MAP[2]}>Morning</option>
                        <option value={MAP[1]}>Afternoon</option>
                        <option value={MAP[0]}>Leave</option>
                      </select>
                      {item.shift_date !== 3 && (
                        <>
                          <label style={{ fontSize: 16 }}>
                            Reason (Absence
                            {item.shift_date === 0
                              ? " today"
                              : item.shift_date === 1
                              ? " this morning"
                              : " this afternoon"}
                            )
                          </label>
                          <input
                            disabled={item.shift_date === 3}
                            name="reason"
                            value={item.reason_content}
                            onChange={(event) => handleChange(event, index)}
                          />
                        </>
                      )}
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
