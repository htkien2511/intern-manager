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
import { getAuth } from "utils/helpers";
import ErrorPage from "components/common/ErrorPage";

export default function ManageScheduleDetail() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [scheduleSelected, setScheduleSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { internID } = useParams();

  useEffect(() => {
    dispatch(setTitle("Manage Schedule Detail"));
  }, [dispatch]);

  const permissions =
    getAuth().permissionDomains.map((item) => item.name.substring(7)) || [];

  const [dataEvents, setDataEvents] = useState([]);

  useEffect(() => {
    if (
      !(
        permissions.includes("GetScheduleOfUser") ||
        getAuth().role === "ROLE_ADMIN"
      )
    )
      return;
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
    // eslint-disable-next-line
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
          return "white";
      }
    };
    return (
      <div
        className="align__center"
        style={{
          background: renderColorByShift(),
          height: 30,
          width: 40,
          borderRadius: 5,
          color: "blue",
          textAlign: "center",
        }}
      >
        {/* {eventInfo.event._def.extendedProps.shift !== 3 && "Details"} */}
      </div>
    );
  };
  const handleEditSchedule = () => {
    if (
      !(permissions.includes("EditSchedule") || getAuth().role === "ROLE_ADMIN")
    ) {
      toast.error("Sorry, you are not authorized to edit schedule.");
      return;
    }
    if (!scheduleSelected.leave_id) {
      toast.warn("Please select schedule");
      return;
    }
    setShowModalEdit(true);
  };

  const handleEventClick = (eventInfo) => {
    setScheduleSelected({
      ...scheduleSelected,
      leave_id: eventInfo.event && eventInfo.event._def.publicId,
      shift: eventInfo.event && eventInfo.event._def.extendedProps.shift,
      leave_date: moment(
        eventInfo.event && eventInfo.event._instance.range.start
      ).format("YYYY/MM/DD"),
      reason_content:
        eventInfo.event && eventInfo.event._def.extendedProps.reason,
    });
  };

  // const [workingWeek, setWorkingWeek] = useState([]);
  // const curr = new Date();
  // const [firstDateWeek, setFirstDateWeek] = useState(
  //   new Date().getDate() -
  //     new Date().getDay() +
  //     (new Date().getDay() === 0 ? -6 : 1)
  // );

  // useEffect(() => {
  //   if (curr.getTime() > new Date(curr.setDate(firstDateWeek + 4)).getTime()) {
  //     setFirstDateWeek(firstDateWeek + 7);
  //     let array = [];
  //     [1, 2, 3, 4, 5].forEach((item) => {
  //       let date = new Date(curr.setDate(firstDateWeek + 6 + item));
  //       array.push(date);
  //     });
  //     setWorkingWeek(array);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // function handleAddLeaveSchedule() {
  //   if (
  //     !(
  //       permissions.includes("CreateSchedule") ||
  //       getAuth().role === "ROLE_ADMIN"
  //     )
  //   ) {
  //     toast.error("Sorry, you are not authorized to create schedule.");
  //     return;
  //   }
  //   if (
  //     dataEvents
  //       .map((i) => moment(i.date).format("YYYY/MM/DD"))
  //       .includes(
  //         workingWeek.map((item) => moment(item).format("YYYY/MM/DD"))[0]
  //       )
  //   ) {
  //     toast.warn("You're only edited schedule!");
  //     return;
  //   }
  //   setShowModal(true);
  // }

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
  const editSchedule = useSelector((store) => store.updateSchedule).loading;
  const createSchedule = useSelector((store) => store.addLeaveSchedule).loading;

  return (
    <div className="manage-schedule-detail">
      {(loadingIntern || editSchedule || createSchedule) && <SpinLoading />}
      <div className="manage-schedule-detail__inner">
        <div
          className="block__header flex items-center space-between"
          style={{ marginTop: 20, marginBottom: 30 }}
        >
          <div className="block__back-previous-page">
            <RollbackOutlined onClick={() => window.history.back()} />
            <div onClick={() => window.history.back()}>
              Back to previous page
            </div>
          </div>
          {/* <button
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
          </button> */}
        </div>
      </div>
      {permissions.includes("GetScheduleOfUser") ||
      getAuth().role === "ROLE_ADMIN" ? (
        <div className="manage-schedule-detail__inner">
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
                <div className="flex items-center space-between">
                  <span className="title">
                    Information details of the off-day
                  </span>
                  <button
                    className="button button--secondary btn-edit-schedule"
                    style={{ width: 140, textAlign: "right" }}
                    onClick={handleEditSchedule}
                  >
                    Edit schedule
                  </button>
                </div>

                <div className="block__info">
                  <div>
                    <span>Reason: </span>
                    {scheduleSelected.reason_content ? (
                      scheduleSelected.reason_content
                    ) : (
                      <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                    )}
                  </div>
                  <div>
                    <span>Date: </span>
                    {scheduleSelected.leave_date ? (
                      moment(scheduleSelected.leave_date).format("YYYY/MM/DD")
                    ) : (
                      <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                    )}
                  </div>
                  <div>
                    <span>Session: </span>
                    {scheduleSelected.shift === 0 ? (
                      "All day"
                    ) : scheduleSelected.shift === 1 ? (
                      "The morning"
                    ) : scheduleSelected.shift === 2 ? (
                      "The afternoon"
                    ) : scheduleSelected.shift === 3 ? (
                      "Working normal"
                    ) : (
                      <span style={{ fontSize: 15, color: "gray" }}>Empty</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage message="Sorry, you are not authorized to get data this page." />
      )}

      {showModal && (
        <ModalAddLeaveSchedule
          setOpenModal={setShowModal}
          title="Add leave schedule"
          setData={setDataEvents}
          userID={internID}
        />
      )}
      {showModalEdit && (
        <ModalUpdateSchedule
          setOpenModal={setShowModalEdit}
          title="Edit leave schedule"
          data={dataEvents}
          setData={setDataEvents}
          scheduleSelected={scheduleSelected}
          setScheduleSelected={setScheduleSelected}
        />
      )}
    </div>
  );
}
