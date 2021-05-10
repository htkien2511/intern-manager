import React, { useState } from "react";
import { testPlan, iconsAction } from "utils/mockData";
import IconStar from "assets/icons/TTM_Icon-Star.svg";
import IconStarNoFill from "assets/icons/TTM_Icon-Star-NoFill.svg";
import { Button, Table, ProgressBar } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ModalAddTask from "./ModalAddProject";
import { Input } from "reactstrap";
import Popup from "components/common/core/Popup";
import { RollbackOutlined } from "@ant-design/icons";

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
  let i = 0;
  for (i = 0; i < 5; i++) {
    if (i < amount) {
      stars.push(IconStar);
    } else {
      stars.push(IconStarNoFill);
    }
  }
  return stars;
};
const renderTable = (title, data) => {
  return (
    <div className="test-library__inner__content__test-plan">
      <Table>
        <thead>
          <tr>
            <th>{title}</th>
            <th>Task</th>
            <th>CREATED AT</th>
            <th>COMPLETED AT</th>
            <th>ASSIGN BY</th>
            <th>PRIORITY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner">
                      {item.projectName}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner test-plan__content__inner--test__plan">
                      <span>{item.test_plan.value}</span>
                      {item.test_plan.progress ? (
                        <div className="block__progress">
                          <ProgressBar now={item.test_plan.progress} />
                          <Spinner
                            animation="border"
                            className="block__progress__spinner"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner">
                      {item.created}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner">
                      {item.last_run}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner test-plan__content__inner--owner">
                      <i />
                      <span>{item.owner}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="test-plan__content">
                    <div className="test-plan__content__inner">
                      {renderStars(item.priority).map((item, index) => {
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
                  <div className="test-plan__content test-plan__content--actions">
                    {iconsAction.map((item, index) => {
                      return (
                        <Icon key={index} icon={item.name} color={item.color} />
                      );
                    })}
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

const ManageProjectDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleAddTask = () => {
    setShowModal(true);
  };
  const handleConfirm = () => {
    setOpenModalDelete(false);
  };

  return (
    <>
      <div className="test-library">
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
                <span>CREATE NEW</span>
              </Button>
            </div>
            <div className="button manage-intern__inner__top__search">
              <i className="fi-rr-search"></i>
              <Input
                type="text"
                name="search"
                id="searchKey"
                placeholder="Search project(s)"
              />
            </div>
          </div>
          <div className="test-library__inner__content">
            {renderTable("Project Name", testPlan)}
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
