import React, { useEffect, useState } from "react";
import { iconsAction } from "utils/mockData";
import IconStar from "assets/icons/TTM_Icon-Star.svg";
import IconStarNoFill from "assets/icons/TTM_Icon-Star-NoFill.svg";
import { Button, Table } from "react-bootstrap";
import ModalAddTask from "./ModalAddTask";
import { Input } from "reactstrap";
import Popup from "components/common/core/Popup";
import { CommentOutlined, RollbackOutlined } from "@ant-design/icons";
import { Empty, Spin, Tooltip } from "antd";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";
import { useHistory, useParams } from "react-router";
import { getAllTasksByProjectID } from "redux/actions/admin/getAllTaskByProjectID";
import moment from "moment";
import SpinLoading from "components/common/core/SpinLoading";
import { deleteTask } from "redux/actions/admin/deleteTask";
import { toast } from "react-toastify";
import ModalEditTask from "./ModalEditTask";
import ModalShowDetail from "./ModalShowDetail";
import { getAuth } from "utils/helpers";
import ErrorPage from "components/common/ErrorPage";
import { ManageFeedback } from "../manageFeedback";
import { Badge } from "antd";
import { getAllFeedbacksByTaskID } from "redux/actions/admin/getAllFeedbacksByTaskID";
import { ROUTE_MANAGE_PROJECT } from "utils/routes";

const Icon = ({ icon, color }) => {
  return (
    <div
      className="block--icon align__center"
      style={{ backgroundColor: color }}
    >
      <img src={icon} alt="" />
    </div>
  );
};
const renderStars = (amount) => {
  const stars = [];
  const map = { Hard: 3, Normal: 2, Easy: 1 };
  let i = 0;
  for (i = 0; i < 3; i++) {
    if (i < map[amount]) {
      stars.push(IconStar);
    } else {
      stars.push(IconStarNoFill);
    }
  }
  return stars;
};

const ManageProjectDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalSeeDetails, setShowModalSeeDetails] = useState(false);
  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [taskSelected, setTaskSelected] = useState({});
  const permissions =
    getAuth().permissionDomains.map((item) => item.name.substring(7)) || [];

  const dispatch = useDispatch();
  const { projectId, projectName } = useParams();
  const history = useHistory();
  const storeGetAllFeedback = useSelector(
    (store) => store.getAllFeedbacksByTaskID
  );

  useEffect(() => {
    if (
      !(
        permissions.includes("GetAllTasksByProjectId") ||
        getAuth().role === "ROLE_ADMIN"
      )
    )
      return;
    getAllTasksByProjectID(Number(projectId), (res) => {
      if (res.success) {
        let arr = [];
        res.data.forEach((_data) => {
          getAllFeedbacksByTaskID(_data.taskId, (r) => {
            if (r.success) {
              arr.push({ ..._data, feedBacks: r.data.length });
            }
          });
        });
        setData(arr.sort((a, b) => (a.taskId > b.taskId ? 1 : -1)));
      }
    });
    // eslint-disable-next-line
  }, [projectId]);

  useEffect(() => {
    dispatch(setTitle("Manage List Tasks"));
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item).some((key) =>
          (item[key] + "").toString().toLowerCase().includes(searchText)
        );
      });
      setFilteredData(filteredData);
    }
  }, [searchText, data]);

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    setSearchText(lowercasedValue);
  };

  const handleAddTask = () => {
    if (
      !(permissions.includes("CreateTask") || getAuth().role === "ROLE_ADMIN")
    ) {
      toast.error("Sorry, you are not authorized to create task.");
      return;
    }
    setShowModal(true);
  };

  const storeGetAllTasks = useSelector((store) => store.getAllTasksByProjectID);

  const renderTable = (input) => {
    return (
      <div className="test-library__inner__content__test-plan">
        <h2
          style={{ textAlign: "center", color: "orangered", marginBottom: 20 }}
        >
          {projectName}
        </h2>
        {!(input && input.length) ? (
          <div style={{ position: "absolute", left: "50%" }}>
            <Empty />
          </div>
        ) : (
          <Table style={{ margin: 20 }}>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task name</th>
                <th>CREATED AT</th>
                <th>DUE DATE</th>
                <th>Level</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {input.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.taskId}
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        maxWidth: "180px",
                        paddingRight: 50,
                        overflowWrap: "anywhere",
                      }}
                    >
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.createDate
                            ? moment(item.createDate).format("YYYY-MM-DD")
                            : "Empty"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.dueDate
                            ? moment(item.dueDate).format("YYYY-MM-DD")
                            : "Empty"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {renderStars(item.difficulty).map((item, index) => {
                            return (
                              <img
                                src={item}
                                alt=""
                                key={index}
                                className="icon--star"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.isDone ? (
                            "Done"
                          ) : (
                            <div className="flex align__center">
                              <span style={{ marginRight: 15 }}>
                                In progress
                              </span>
                              <Spin size="small" />
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content test-plan__content--actions">
                        {iconsAction.map((element, index) => {
                          return (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                marginRight: 5,
                                background: "gray",
                                borderRadius: 5,
                              }}
                              className="flex align__center"
                              key={index}
                              onClick={() =>
                                handleActions(item, element.action)
                              }
                            >
                              <Tooltip placement="top" title={element.title}>
                                <IconButton>
                                  <Icon
                                    icon={element.name}
                                    color={element.color}
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          );
                        })}
                        <Badge count={item.feedBacks}>
                          <div onClick={() => handleActions(item, "Feedback")}>
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                background: "gray",
                                borderRadius: 5,
                              }}
                              className="flex align__center"
                            >
                              <Tooltip placement="top" title="Feedback">
                                <IconButton>
                                  <CommentOutlined style={{ color: "white" }} />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </Badge>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    );
  };

  const handleActions = (item, action) => {
    switch (action) {
      case "See":
        setShowModalSeeDetails(true);
        setTaskSelected(item);
        break;
      case "Edit":
        if (
          !(permissions.includes("EditTask") || getAuth().role === "ROLE_ADMIN")
        ) {
          toast.error("Sorry, you are not authorized to edit task.");
          return;
        }
        setShowModalEdit(true);
        setTaskSelected(item);
        break;
      case "Delete":
        if (
          !(
            permissions.includes("DeleteTask") ||
            getAuth().role === "ROLE_ADMIN"
          )
        ) {
          toast.error("Sorry, you are not authorized to delete task.");
          return;
        }
        setTaskSelected(item);
        setOpenModalDelete(true);
        break;
      case "Feedback": {
        setTaskSelected(item);
        setShowModalFeedback(true);
        break;
      }
      default:
        break;
    }
  };

  const handleConfirm = () => {
    deleteTask(taskSelected.taskId, (res) => {
      if (res.success) {
        setData(data.filter((item) => item.taskId !== taskSelected.taskId));
        toast.success("Deleted successfully");
      } else {
        toast.error(res.message || "Delete failed");
      }
    });
    setOpenModalDelete(false);
  };

  const storeCreateTask = useSelector((store) => store.createTask);
  const storeEditTask = useSelector((store) => store.updateTask);
  const storeDeleteTask = useSelector((store) => store.deleteTask);

  const loadingGetAllFeedback = useSelector(
    (store) => store.getAllFeedbacksByTaskID
  ).loading;
  const loadingDeleteFeedback = useSelector(
    (store) => store.deleteFeedback
  ).loading;

  const loadingCreateFeedback = useSelector(
    (store) => store.addFeedback
  ).loading;
  const loadingUpdateFeedback = useSelector(
    (store) => store.updateFeedback
  ).loading;

  return (
    <>
      <div className="test-library">
        {(storeGetAllTasks.loading ||
          storeCreateTask.loading ||
          storeEditTask.loading ||
          storeDeleteTask.loading ||
          loadingGetAllFeedback ||
          loadingDeleteFeedback ||
          loadingCreateFeedback ||
          loadingUpdateFeedback ||
          storeGetAllFeedback.loading) && <SpinLoading />}
        <div
          className="block__back-previous-page"
          style={{ marginLeft: 30, marginTop: 15 }}
        >
          <RollbackOutlined
            onClick={() => history.push(ROUTE_MANAGE_PROJECT)}
          />
          <div onClick={() => history.push(ROUTE_MANAGE_PROJECT)}>
            Back to previous page
          </div>
        </div>
        <div className="test-library__inner">
          <div className="test-library__inner__header">
            <div className="button--create-new align__center">
              <span className="button--create-new__icon--plus">+</span>
              <Button
                className="button--create-new__btn--create"
                onClick={handleAddTask}
              >
                <span>NEW TASK</span>
              </Button>
            </div>
            <div className="button manage-intern__inner__top__search">
              <i className="fi-rr-search"></i>
              <Input
                type="text"
                name="search"
                id="searchKey"
                onChange={handleSearch}
                placeholder="Search task(s)"
              />
            </div>
          </div>
          {permissions.includes("GetAllTasksByProjectId") ||
          getAuth().role === "ROLE_ADMIN" ? (
            <div className="test-library__inner__content">
              {renderTable(filteredData)}
            </div>
          ) : (
            <ErrorPage message="Sorry, you are not authorized to get data this page." />
          )}
        </div>
      </div>
      {showModal && (
        <ModalAddTask
          setOpenModal={setShowModal}
          title="Add task"
          setData={setData}
          projectId={projectId}
          dueDateProject={history.location.state.dueDate}
        />
      )}
      {showModalEdit && (
        <ModalEditTask
          setOpenModal={setShowModalEdit}
          title="Edit task"
          setData={setData}
          input={taskSelected}
          projectId={projectId}
          dueDateProject={history.location.state.dueDate}
        />
      )}
      {showModalSeeDetails && (
        <ModalShowDetail
          setOpenModal={setShowModalSeeDetails}
          title="Information details task"
          setData={setData}
          input={taskSelected}
          projectId={projectId}
        />
      )}
      {openModalDelete && (
        <Popup
          onCancel={setOpenModalDelete}
          onConfirm={handleConfirm}
          title="Are you sure to delete this task?"
        />
      )}
      {showModalFeedback && (
        <ManageFeedback
          setOpenModal={setShowModalFeedback}
          title="List Feedbacks"
          task={taskSelected}
          data={data}
          setData={setData}
          projectId={projectId}
        />
      )}
    </>
  );
};
export default ManageProjectDetail;
