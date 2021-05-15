import React, { useEffect, useState } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import { RollbackOutlined } from "@ant-design/icons";
import { setTitle } from "redux/actions/admin/setTitle";
import { useDispatch } from "react-redux";

export default function ManageScheduleDetail() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Manage Schedule Detail"));
  }, [dispatch]);

  const dataEvents = [
    { shift: 1, reason: "Busy", date: "2021-05-09", id: 1 },
    { shift: 2, reason: "Busy", date: "2021-05-08", id: 2 },
    { shift: 0, reason: "Busy", date: "2021-05-07", id: 3 },
    { shift: 1, reason: "Busy", date: "2021-05-06", id: 4 },
  ];

  const renderEventContent = (eventInfo) => {
    const renderColorByShift = () => {
      switch (eventInfo.event._def.extendedProps.shift) {
        case 0:
          return "red";
        case 1:
          return "yellow";
        case 2:
          return "chocolate";
        default:
          return "blue";
      }
    };
    return (
      <div style={{ background: renderColorByShift(), height: 100 }}></div>
    );
  };
  const [infoDetailsOffDay, setInfoDetailsOffDay] = useState({});

  const handleEventClick = (eventInfo) => {
    setInfoDetailsOffDay(eventInfo.event._def.extendedProps.reason);
    setInfoDetailsOffDay(eventInfo);
  };

  return (
    <div className="manage-schedule-detail">
      <div className="block__back-previous-page">
        <RollbackOutlined onClick={() => window.history.back()} />
        <div onClick={() => window.history.back()}>Back to previous page</div>
      </div>
      <div className="manage-schedule-detail__inner flex items-center">
        <div className="block__calendar">
          <div
            className="flex block__info_shift"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="flex">
              <span>Off the morning</span>
              <div
                style={{
                  background: "yellow",
                }}
              ></div>
            </div>
            <div className="flex">
              <span>Off the afternoon</span>
              <div
                style={{
                  background: "chocolate",
                }}
              ></div>
            </div>
            <div className="flex">
              <span>Off all day</span>
              <div
                style={{
                  background: "red",
                }}
              ></div>
            </div>
          </div>
          <Calendar
            eventClick={handleEventClick}
            plugins={[dayGridPlugin]}
            events={dataEvents}
            eventContent={renderEventContent}
            headerToolbar={{
              right: "prev,next",
              left: "title",
            }}
          />
        </div>
        <div className="block__info_details">
          <span>Information details of the off day</span>
          <div>
            {infoDetailsOffDay.event &&
              infoDetailsOffDay.event._def.extendedProps.reason}
          </div>
          <div>
            {moment(
              infoDetailsOffDay.event &&
                infoDetailsOffDay.event._instance.range.start
            ).format("YYYY/MM/DD")}
          </div>
          <div>
            {infoDetailsOffDay.event &&
            infoDetailsOffDay.event._def.extendedProps.shift === 0
              ? "All day"
              : infoDetailsOffDay.event &&
                infoDetailsOffDay.event._def.extendedProps.shift === 1
              ? "The morning"
              : "The afternoon"}
          </div>
        </div>
      </div>
    </div>
  );
}
