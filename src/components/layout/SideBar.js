import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { setTitle } from "redux/actions/admin/setTitle";
import {
  ROUTE_MANAGE_ACCOUNT_WAITING,
  ROUTE_MANAGE_INTERN,
  ROUTE_MANAGE_LEADER,
  ROUTE_MANAGE_SCHEDULE,
  ROUTE_MANAGE_PROJECT,
  ROUTE_VIEW_STATISTIC,
  ROUTE_MANAGE_PERMISSION_LEADER,
} from "../../utils/routes";
import Logo from "assets/images/logo.png";
import { getAuth } from "utils/helpers";
import { Tooltip } from "antd";
import { ChromeOutlined, UserOutlined } from "@ant-design/icons";

function SideBar() {
  const dispatch = useDispatch();
  const storeSetShowSidebar = useSelector((store) => store.setShowSidebar);
  const history = useHistory();
  return (
    <div
      className={`side-bar ${
        !storeSetShowSidebar.showSidebar && "side-bar--hide"
      }`}
    >
      <div className="side-bar__inner flex items-center space-between">
        <div className="side-bar__inner__items flex flex-col">
          <div className="side-bar__inner__items--logo flex items-center contents-center">
            <img src={Logo} alt="" style={{ width: "100%", height: 95 }} />
          </div>
          <div className="side-bar__inner__items--menu">
            {getAuth().role === "ROLE_ADMIN" && (
              <div className="side-bar__inner__items--menu__item flex">
                {storeSetShowSidebar.showSidebar ? (
                  <>
                    <div className="temp"></div>
                    <UserOutlined
                      onClick={() => {
                        history.push(ROUTE_MANAGE_LEADER);
                        dispatch(setTitle("Manage Leader"));
                      }}
                    />
                    <NavLink
                      activeClassName="side-bar__inner__items--menu__item--active border-corner"
                      to={ROUTE_MANAGE_LEADER}
                      onClick={() => dispatch(setTitle("Manage Leader"))}
                    >
                      Manage Leader
                    </NavLink>
                  </>
                ) : (
                  <>
                    <div className="temp"></div>
                    <Tooltip placement="top" title="Manage Leader">
                      <UserOutlined
                        onClick={() => {
                          history.push(ROUTE_MANAGE_LEADER);
                          dispatch(setTitle("Manage Leader"));
                        }}
                      />
                    </Tooltip>
                  </>
                )}
              </div>
            )}

            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <ChromeOutlined
                    onClick={() => {
                      history.push(ROUTE_MANAGE_PERMISSION_LEADER);
                      dispatch(setTitle("Manage Permission Leader"));
                    }}
                  />
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active border-corner"
                    to={ROUTE_MANAGE_PERMISSION_LEADER}
                    onClick={() =>
                      dispatch(setTitle("Manage Permission Leader"))
                    }
                  >
                    Manage Permission Leader
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="Manage Permission Leader">
                    <ChromeOutlined
                      onClick={() => {
                        history.push(ROUTE_MANAGE_PERMISSION_LEADER);
                        dispatch(setTitle("Manage Permission Leader"));
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <i
                    className="fi-rr-user"
                    onClick={() => {
                      history.push(ROUTE_MANAGE_INTERN);
                      dispatch(setTitle("Manage Intern"));
                    }}
                  ></i>
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active"
                    to={ROUTE_MANAGE_INTERN}
                    onClick={() => dispatch(setTitle("Manage Intern"))}
                  >
                    Manage Intern
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="Manage Intern">
                    <i
                      className="fi-rr-user"
                      onClick={() => {
                        history.push(ROUTE_MANAGE_INTERN);
                        dispatch(setTitle("Manage Intern"));
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <i
                    className="fi-rr-calendar"
                    onClick={() => {
                      history.push(ROUTE_MANAGE_SCHEDULE);
                      dispatch(setTitle("Manage Schedule Intern"));
                    }}
                  ></i>
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active border-corner"
                    to={ROUTE_MANAGE_SCHEDULE}
                    onClick={() => dispatch(setTitle("Manage Schedule Intern"))}
                  >
                    Manage Schedule Intern
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="Manage Schedule">
                    <i
                      className="fi-rr-calendar"
                      onClick={() => {
                        history.push(ROUTE_MANAGE_SCHEDULE);
                        dispatch(setTitle("Manage Schedule Intern"));
                      }}
                    ></i>
                  </Tooltip>
                </>
              )}
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <i
                    className="fi-rr-list-check"
                    onClick={() => {
                      history.push(ROUTE_MANAGE_PROJECT);
                      dispatch(setTitle("Manage Project"));
                    }}
                  />
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active border-corner"
                    to={ROUTE_MANAGE_PROJECT}
                    onClick={() => dispatch(setTitle("Manage Project"))}
                  >
                    Manage Project Intern
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="Manage Project">
                    <i
                      className="fi-rr-list-check"
                      onClick={() => {
                        history.push(ROUTE_MANAGE_PROJECT);
                        dispatch(setTitle("Manage Project"));
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <i
                    className="fi-rr-hourglass-end"
                    onClick={() => {
                      history.push(ROUTE_MANAGE_ACCOUNT_WAITING);
                      dispatch(setTitle("Manage Account Waiting"));
                    }}
                  />
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active border-corner"
                    to={ROUTE_MANAGE_ACCOUNT_WAITING}
                    onClick={() => dispatch(setTitle("Manage Account Waiting"))}
                  >
                    Manage Account Waiting
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="Manage Account Waiting">
                    <i
                      className="fi-rr-hourglass-end"
                      onClick={() => {
                        history.push(ROUTE_MANAGE_ACCOUNT_WAITING);
                        dispatch(setTitle("Manage Account Waiting"));
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
            <div className="side-bar__inner__items--menu__item flex">
              {storeSetShowSidebar.showSidebar ? (
                <>
                  <div className="temp"></div>
                  <i
                    className="fi-rr-stats"
                    onClick={() => {
                      history.push(ROUTE_VIEW_STATISTIC);
                      dispatch(setTitle("View statistics"));
                    }}
                  />
                  <NavLink
                    activeClassName="side-bar__inner__items--menu__item--active border-corner"
                    to={ROUTE_VIEW_STATISTIC}
                    onClick={() => dispatch(setTitle("View Statistics"))}
                  >
                    View statistics
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="temp"></div>
                  <Tooltip placement="top" title="View statistics">
                    <i
                      className="fi-rr-stats"
                      onClick={() => {
                        history.push(ROUTE_VIEW_STATISTIC);
                        dispatch(setTitle("View statistics"));
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
