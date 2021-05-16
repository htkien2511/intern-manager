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
import { useParams } from "react-router";
import { getAllTasksByProjectID } from "redux/actions/admin/getAllTaskByProjectID";
import moment from "moment";
import SpinLoading from "components/common/core/SpinLoading";
import { deleteTask } from "redux/actions/admin/deleteTask";
import { toast } from "react-toastify";
import ModalEditTask from "./ModalEditTask";

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
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [taskSelected, setTaskSelected] = useState({});
  const handleAddTask = () => {
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    getAllTasksByProjectID(Number(projectId), (res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, [projectId]);

  useEffect(() => {
    dispatch(setTitle("Manage List Tasks"));
  }, [dispatch]);

  const storeGetAllTasks = useSelector((store) => store.getAllTasksByProjectID);

  const renderTable = (title, input) => {
    return (
      <div className="test-library__inner__content__test-plan">
        {/* <h2 style={{ textAlign: "center", color: "orangered" }}>
          Project Name
        </h2> */}
        {!input ? (
          <div style={{ position: "absolute", left: "50%" }}>
            <Empty />
          </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task name</th>
                <th>CREATED AT</th>
                <th>DUE DATE</th>
                {/* <th>DESCRIPTIONS</th> */}
                {/* <th>USERS ASSIGNED</th> */}
                <th>Level</th>
                <th>STATUS</th>
                {/* <th>POINT</th> */}
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
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          <span>{item.title}</span>
                          {/* {item.title.progress ? (
                          <div className="block__progress">
                            <ProgressBar now={item.title.progress} />
                            <Spinner
                              animation="border"
                              className="block__progress__spinner"
                            />
                          </div>
                        ) : null} */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.createDate
                            ? moment(item.createDate).format("DD/MM/YYYY")
                            : "Empty"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {item.dueDate
                            ? moment(item.dueDate).format("DD/MM/YYYY")
                            : "Empty"}
                        </div>
                      </div>
                    </td>
                    {/* <td>
                    <div className="test-plan__content">
                      <div className="test-plan__content__inner ">
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </td> */}
                    {/* <td>
                    <div className="test-plan__content">
                      <div className="test-plan__content__inner">
                        <span>
                          <AvatarBlock
                            users_list={item.usersAssignee.split(",")}
                          />
                        </span>
                      </div>
                    </div>
                  </td> */}
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
                    {/* <td>
                    <div className="test-plan__content">
                      <div className="test-plan__content__inner ">
                        <span>{item.point}</span>
                      </div>
                    </div>
                  </td> */}
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
        console.log("See");
        setTaskSelected(item);
        break;
      case "Edit":
        console.log("Edit");
        setShowModalEdit(true);
        setTaskSelected(item);
        break;
      case "Delete":
        console.log("Delete");
        setTaskSelected(item);
        setOpenModalDelete(true);
        break;
      case "Feedback": {
        console.log("Feedback");
        break;
      }
      default:
        break;
    }
  };

  const handleConfirm = () => {
    deleteTask(taskSelected.taskId, (res) => {
      if (res.success) {
        toast.success("Deleted successfully");
        setData(data.filter((item) => item.taskId !== taskSelected.taskId));
      } else {
        toast.error(res.message || "Delete failed");
      }
    });
    setOpenModalDelete(false);
  };

  const storeCreateTask = useSelector((store) => store.createTask);

  return (
    <>
      <div className="test-library">
        {(storeGetAllTasks.loading || storeCreateTask.loading) && (
          <SpinLoading />
        )}
        <div className="block__back-previous-page">
          <RollbackOutlined onClick={() => window.history.back()} />
          <div onClick={() => window.history.back()}>Back to previous page</div>
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
                placeholder="Search task(s)"
              />
            </div>
          </div>
          <div className="test-library__inner__content">
            {renderTable("Project Name", data)}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalAddTask
          setOpenModal={setShowModal}
          title="Add task"
          setData={setData}
          projectId={projectId}
        />
      )}
      {showModalEdit && (
        <ModalEditTask
          setOpenModal={setShowModalEdit}
          title="Edit task"
          setData={setData}
          input={taskSelected}
          projectId={projectId}
        />
      )}
      {openModalDelete && (
        <Popup
          onCancel={setOpenModalDelete}
          onConfirm={handleConfirm}
          title="Are you delete this task?"
        />
      )}
    </>
  );
};
export default ManageProjectDetail;
