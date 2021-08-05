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
import IconEye from "assets/icons/TTM_Icon-Eye.svg";
import { useHistory } from "react-router-dom";
import { ROUTE_MANAGE_SCHEDULE } from "utils/routes";
import { addLeaveSchedule } from "redux/actions/intern/addLeaveSchedule";

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

  const getProfileLeader = useSelector((store) => store.getProfileLeader)?.data;
  const [workingWeek, setWorkingWeek] = useState([]);
  const curr = new Date();
  const [firstDateWeek, setFirstDateWeek] = useState(
    new Date().getDate() -
      new Date().getDay() +
      (new Date().getDay() === 0 ? -6 : 1)
  );

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    setPermissions(
      getProfileLeader?.data?.permissionDomains.map((item) =>
        item.name.substring(7)
      ) || []
    );
  }, [getProfileLeader]);

  const [dataEvents, setDataEvents] = useState([]);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const createSchedule = useSelector((store) => store.createSchedule);
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
        setDataEvents(getUniqueListBy(arr, "date"));

        // create schedule for intern when intern have not create new schedule for new week.
        // if (!res.data.length) return;
        if (
          !res.data
            .map((_item) => _item.time)
            .includes(workingWeek[0].leave_date)
        ) {
          workingWeek.forEach((element, index) => {
            const formData = {
              shift_date: element.shift_date,
              leave_date: element.leave_date,
              reason_content: "",
              user_id: internID,
            };
            addLeaveSchedule(formData, (res) => {
              if (!res.success) {
                toast.error(res.message);
              } else {
                console.log("adddinggg");
                // // handle lai sau ***
                // window.location.reload();
              }
            });
          });
        } else {
          console.log("updatedddd");
        }
      }
    });
  }, [internID, permissions, workingWeek, createSchedule?.data]);

  const renderEventContent = (eventInfo) => {
    const renderColorByShift = () => {
      switch (eventInfo.event._def.extendedProps.shift) {
        case 0:
          return "red";
        case 1:
          return "#afaf05";
        case 2:
          return "#f19402";
        default:
          return "blue";
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
        }}
      >
        <img src={IconEye} alt="" style={{ width: 14 }} />
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

  useEffect(() => {
    if (
      curr.getTime() > new Date(new Date().setDate(firstDateWeek + 4)).getTime()
    ) {
      setFirstDateWeek(firstDateWeek + 7);
      let array = [];
      [1, 2, 3, 4, 5].forEach((item) => {
        let date = moment(
          new Date(new Date().setDate(firstDateWeek + 6 + item))
        ).format("YYYY/MM/DD");
        array.push({
          leave_date: date,
          shift_date: 3,
        });
      });
      setWorkingWeek(array);
    } else {
      setFirstDateWeek(firstDateWeek);
      let array = [];
      [1, 2, 3, 4, 5].forEach((item) => {
        let date = moment(
          new Date(new Date().setDate(firstDateWeek - 1 + item))
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
  const history = useHistory();

  return (
    <div className="manage-schedule-detail">
      {(loadingIntern || editSchedule || createSchedule?.loading) && (
        <SpinLoading />
      )}
      <div className="manage-schedule-detail__inner">
        <div
          className="block__header flex items-center space-between"
          style={{ marginTop: 20, marginBottom: 30 }}
        >
          <div className="block__back-previous-page">
            <RollbackOutlined
              onClick={() => history.push(ROUTE_MANAGE_SCHEDULE)}
            />
            <div onClick={() => history.push(ROUTE_MANAGE_SCHEDULE)}>
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
                      background: "#afaf05",
                    }}
                  ></div>
                </div>
                <div className="flex">
                  <span>Off the afternoon</span>
                  <div
                    style={{
                      background: "#f19402",
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
                <div className="flex">
                  <span>Working normal</span>
                  <div
                    style={{
                      background: "blue",
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
