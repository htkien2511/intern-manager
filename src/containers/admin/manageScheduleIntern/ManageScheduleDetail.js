import React, { useEffect, useState } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import { RollbackOutlined } from "@ant-design/icons";
import { setTitle } from "redux/actions/admin/setTitle";
import { useDispatch } from "react-redux";
import ModalUpdateSchedule from "./ModalUpdateSchedule";
import ModalAddLeaveSchedule from "./ModalAddLeaveSchedule";
import { useParams } from "react-router";

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
      <div
        style={{
          background: renderColorByShift(),
          height: 60,
          width: 60,
          borderRadius: 5,
          textAlign: "center",
        }}
      ></div>
    );
  };
  const [infoDetailsOffDay, setInfoDetailsOffDay] = useState({});

  const handleEventClick = (eventInfo) => {
    setInfoDetailsOffDay(eventInfo);
    setScheduleSelected({
      ...scheduleSelected,
      shift: eventInfo.event && eventInfo.event._def.extendedProps.shift,
      leave_date: moment(
        eventInfo.event && eventInfo.event._instance.range.start
      ).format("YYYY/MM/DD"),
      reason_content:
        eventInfo.event && eventInfo.event._def.extendedProps.reason,
    });

    setShowModalEdit(true);
  };

  const [data, setData] = useState([]);
  const [scheduleSelected, setScheduleSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { internID } = useParams();

  function handleAddLeaveSchedule() {
    setShowModal(true);
  }

  return (
    <div className="manage-schedule-detail">
      <div className="manage-schedule-detail__inner">
        <div
          className="flex items-center space-between"
          style={{ marginTop: 20, marginBottom: 30 }}
        >
          <div className="block__back-previous-page">
            <RollbackOutlined onClick={() => window.history.back()} />
            <div onClick={() => window.history.back()}>
              Back to previous page
            </div>
          </div>
          <button
            className="button button--add__schedule"
            style={{
              width: "auto",
              padding: 15,
              background: "chocolate",
              color: "white",
              height: 40,
            }}
            onClick={handleAddLeaveSchedule}
          >
            Add leave schedule
          </button>
        </div>
        <div className="flex">
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
            <span className="block__info_details__title">
              Information details of the off-day
            </span>
            <div className="block__info">
              <div>
                <span>Reason: </span>
                {infoDetailsOffDay.event &&
                infoDetailsOffDay.event._def.extendedProps.reason
                  ? infoDetailsOffDay.event._def.extendedProps.reason
                  : "Empty"}
              </div>
              <div>
                <span>Date: </span>
                {moment(
                  infoDetailsOffDay.event &&
                    infoDetailsOffDay.event._instance.range.start
                ).format("YYYY/MM/DD")}
              </div>
              <div>
                <span>Session: </span>
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
      </div>
      {showModal && (
        <ModalAddLeaveSchedule
          setOpenModal={setShowModal}
          title="Add leave schedule"
          setData={setData}
          userID={internID}
        />
      )}
      {showModalEdit && (
        <ModalUpdateSchedule
          setOpenModal={setShowModalEdit}
          title="Edit leave schedule"
          setData={setData}
          userID={internID}
          scheduleSelected={scheduleSelected}
        />
      )}
    </div>
  );
}
