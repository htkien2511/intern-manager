import React, { useEffect, useState } from "react";
import { iconsAction } from "utils/mockData";
import IconStar from "assets/icons/TTM_Icon-Star.svg";
import IconStarNoFill from "assets/icons/TTM_Icon-Star-NoFill.svg";
import { Button, Table } from "react-bootstrap";
// import {ProgressBar} from "react-bootstrap"
// import Spinner from "react-bootstrap/Spinner";
import ModalAddTask from "./ModalAddProject";
import { Input } from "reactstrap";
import Popup from "components/common/core/Popup";
import { CommentOutlined, RollbackOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "redux/actions/admin/setTitle";
import { useParams } from "react-router";
import { getAllTasksByProjectID } from "redux/actions/admin/getAllTaskByProjectID";
import moment from "moment";
import SpinLoading from "components/common/core/SpinLoading";
// import AvatarBlock from "components/common/core/AvatarBlock";

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
  const map = { Hard: 3, Medium: 2, Easy: 1 };
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
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [data, setData] = useState([]);
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
            {input &&
              input.map((item, index) => {
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
                          {moment(item.createDate).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="test-plan__content">
                        <div className="test-plan__content__inner">
                          {moment(item.dueDate).format("DD/MM/YYYY")}
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
                          {item.isDone ? "Done" : "In Progress"}
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
                        {iconsAction.map((item, index) => {
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
                              onClick={() => handleActions(item.action)}
                            >
                              <Tooltip placement="top" title={item.title}>
                                <IconButton>
                                  <Icon icon={item.name} color={item.color} />
                                </IconButton>
                              </Tooltip>
                            </div>
                          );
                        })}
                        <div onClick={() => handleActions(item.action)}>
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
                                <CommentOutlined />
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
      </div>
    );
  };

  const handleActions = (action) => {
    switch (action) {
      case "See":
        console.log("See");
        break;
      case "Edit":
        console.log("Edit");
        break;
      case "Delete":
        console.log("Delete");
        setOpenModalDelete(true);
        break;
      default:
        break;
    }
  };

  const handleConfirm = () => {
    setOpenModalDelete(false);
  };

  return (
    <>
      <div className="test-library">
        {storeGetAllTasks.loading && <SpinLoading />}
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
        <ModalAddTask setOpenModal={setShowModal} title="Add task" />
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
