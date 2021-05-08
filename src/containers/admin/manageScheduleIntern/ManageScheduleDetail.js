import React from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function ManageScheduleDetail() {
  const dataEvents = [
    { shift: 1, reason: "Busy", date: "2021-05-09", id: 1 },
    { shift: 2, reason: "Busy", date: "2021-05-08", id: 2 },
    { shift: 0, reason: "Busy", date: "2021-05-07", id: 3 },
    { shift: 1, reason: "Busy", date: "2021-05-06", id: 4 },
  ];

  const renderEventContent = (eventInfo) => {
    console.log(eventInfo.event.lesson);
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
      <div style={{ background: renderColorByShift() }}>
        <span style={{ color: "black" }}>
          {eventInfo.event._def.extendedProps.reason}
        </span>
      </div>
    );
  };

  const handleEventClick = (eventInfo) => {
    console.log(eventInfo.event._def.extendedProps);
  };
  return (
    <div className="manage-schedule-detail">
      <div className="manage-schedule-detail__inner">
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
    </div>
  );
}
