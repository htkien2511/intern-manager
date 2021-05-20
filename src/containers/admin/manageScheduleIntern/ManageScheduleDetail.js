import React, { useEffect, useState } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import { RollbackOutlined } from "@ant-design/icons";
import { setTitle } from "redux/actions/admin/setTitle";
import { useDispatch, useSelector } from "react-redux";
import ModalUpdateSchedule from "./ModalUpdateSchedule";
import ModalAddLeaveSchedule from "./ModalAddLeaveSchedule";
import { useParams } from "react-router";
import { getProfileIntern } from "redux/actions/intern/getProfileIntern";
import { toast } from "react-toastify";
import SpinLoading from "components/common/core/SpinLoading";
import { getScheduleUserID } from "redux/actions/admin/getScheduleUserID";

export default function ManageScheduleDetail() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [scheduleSelected, setScheduleSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { internID } = useParams();

  useEffect(() => {
    dispatch(setTitle("Manage Schedule Detail"));
  }, [dispatch]);

  const [dataEvents, setDataEvents] = useState([]);

  useEffect(() => {
    getScheduleUserID(internID, (res) => {
      if (res.success) {
        let arr = [];
        res.data.forEach((item) => {
          arr.push({
            shift: item.shift,
            reason: item.reason,
            date: moment(item.time).format("YYYY-MM-DD"),
            id: item.id,
          });
        });
        setDataEvents(arr);
      }
    });
  }, [internID]);

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

  function handleAddLeaveSchedule() {
    setShowModal(true);
  }

  const [intern, setIntern] = useState({});

  useEffect(() => {
    if (!internID) return;
    getProfileIntern(internID, (res) => {
      if (res.success) {
        setIntern(res.data);
      } else {
        toast.error(res.message || "Get intern failed");
      }
    });
  }, [internID]);

  const loadingIntern = useSelector((store) => store.getProfileIntern).loading;

  return (
    <div className="manage-schedule-detail">
      {loadingIntern && <SpinLoading />}
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
            <div>
              <span className="title">Personal information intern</span>
              <div className="block__info">
                <div>
                  <span>Name: </span>
                  {intern.name || (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
                <div>
                  <span>Email: </span>
                  {intern.email || (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
                <div>
                  <span>Gender: </span>
                  {intern.gender || (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
                <div>
                  <span>Department: </span>
                  {intern.department || (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <span className="title">Information details of the off-day</span>
              <div className="block__info">
                <div>
                  <span>Reason: </span>
                  {infoDetailsOffDay.event &&
                  infoDetailsOffDay.event._def.extendedProps.reason ? (
                    infoDetailsOffDay.event._def.extendedProps.reason
                  ) : (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
                <div>
                  <span>Date: </span>
                  {infoDetailsOffDay.event &&
                  infoDetailsOffDay.event._instance.range.start ? (
                    moment(
                      infoDetailsOffDay.event &&
                        infoDetailsOffDay.event._instance.range.start
                    ).format("YYYY/MM/DD")
                  ) : (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
                <div>
                  <span>Session: </span>
                  {infoDetailsOffDay.event &&
                  infoDetailsOffDay.event._def.extendedProps.shift ? (
                    infoDetailsOffDay.event._def.extendedProps.shift === 0 ? (
                      "All day"
                    ) : infoDetailsOffDay.event &&
                      infoDetailsOffDay.event._def.extendedProps.shift === 1 ? (
                      "The morning"
                    ) : (
                      "The afternoon"
                    )
                  ) : (
                    <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                  )}
                </div>
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
