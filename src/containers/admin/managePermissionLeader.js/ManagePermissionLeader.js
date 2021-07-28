import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Input } from "reactstrap";
import { getAllManager } from "redux/actions/admin/getAllManager";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "components/common/core/SpinLoading";
import { Empty } from "antd";
import { setTitle } from "redux/actions/admin/setTitle";
import { Select, Tag } from "antd";
import { getAllPermission } from "redux/actions/admin/getAllPermission";
import { toast } from "react-toastify";
// import { getPermissionLeader } from "redux/actions/admin/getPermissionLeader";
import { updatePermissionByLeaderID } from "redux/actions/admin/updatePermissionByLeaderID";

const columns = [
  { id: "id", label: "Id", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 180 },
  {
    id: "email",
    label: "Email",
    minWidth: 180,
    align: "left",
  },
  {
    id: "permission",
    label: "Permissions",
    minWidth: 300,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

function createData(id, name, email, permission, actions) {
  return { id, name, email, permission, actions };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ManagePermissionLeader() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Manage Permission Leader"));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [permissions, setPermissions] = useState([]);
  const [options, setOptions] = useState([]);

  const storeGetAllManager = useSelector((store) => store.getAllManager);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    let arr = [];
    getAllManager((data) => {
      if (data.success) {
        let temp = [];
        data.data.forEach((item) => {
          temp.push({
            manager_id: item.id,
            permission_id: item.permissionDomains.map(
              (item) => item.name.split("Leader.")[1]
            ),
          });
          arr.push(
            createData(
              item.id,
              item.name,
              item.email,
              item.permissionDomains.map(
                (item) => item.name.split("Leader.")[1]
              ) || [],
              "Save"
            )
          );
        });
        setData(arr.sort((a, b) => (a.id > b.id ? 1 : -1)));
        setLeaders(temp);
      } else {
        toast.error(data.message);
      }
    });

    getAllPermission((res) => {
      if (res.success) {
        let arr = [];
        setPermissions(res.data);
        res.data.forEach((item) => {
          let object = {
            value: item.name,
          };
          arr.push(object);
        });
        setOptions(arr);
      }
    });
  }, []);

  function tagRender(props) {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  const handleChangeSave = (idLeader) => {
    const input = {
      manager_id: leaders.find((item) => item.manager_id === idLeader)
        .manager_id,
      permission_id: leaders
        .find((item) => item.manager_id === idLeader)
        .permission_id.map(
          (_item) =>
            permissions.find((permission) => permission.name === _item).id
        ),
    };
    if (
      !validatorChoosePermissions(
        leaders.find((item) => item.manager_id === idLeader).permission_id
      )
    ) {
      toast.warn(
        "Please choose GetAll permission before choosing Edit, Delete permission or choose GetAllIntern before choosing GetScheduleOfUser"
      );
      return;
    }
    updatePermissionByLeaderID(input, (res) => {
      if (res.success) {
        toast.success(`Update permission successfully`);
      } else {
        toast.error(res.message);
      }
    });
  };

  function validatorChoosePermissions(input) {
    if (
      !input.includes("GetAllUsers") &&
      (input.includes("EditUser") || input.includes("DeleteUser"))
    ) {
      return false;
    }
    if (
      !input.includes("GetAllProjectsByLeaderId") &&
      (input.includes("EditProject") || input.includes("DeleteProject"))
    ) {
      return false;
    }
    if (
      !input.includes("GetAllTasksByProjectId") &&
      (input.includes("EditTask") || input.includes("DeleteTask"))
    ) {
      return false;
    }
    if (
      !input.includes("GetScheduleOfUser") &&
      input.includes("EditSchedule")
    ) {
      return false;
    }
    if (!input.includes("GetAllUsers") && input.includes("GetScheduleOfUser")) {
      return false;
    }
    return true;
  }

  const handleChangePermission = (options, idLeader) => {
    let temp = [...leaders];
    temp
      .filter((item) => item.manager_id === idLeader)
      .forEach((element) => {
        element.permission_id = options;
      });
  };

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        const actions = value && value.split("|");
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              {actions &&
                actions.map((item, index) => {
                  return (
                    <button
                      key={index}
                      style={{ margin: 5, color: "white" }}
                      className="button button--secondary"
                      onClick={() => handleChangeSave(row.id)}
                    >
                      {item}
                    </button>
                  );
                })}
            </div>
          </TableCell>
        );
      }
      case "permission":
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <Select
              mode="multiple"
              showArrow
              placeholder="Choice permissions"
              tagRender={tagRender}
              defaultValue={row.permission}
              onChange={(options) => handleChangePermission(options, row.id)}
              options={options}
              maxTagCount={3}
            />
          </TableCell>
        );
      default:
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            {value ? (
              column.format && typeof value === "number" ? (
                column.format(value)
              ) : (
                value
              )
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ padding: 0 }}
              />
            )}
          </TableCell>
        );
    }
  };

  const loadingDelete = useSelector((store) => store.deleteUser).loading;
  const loadingAdd = useSelector((store) => store.addManager).loading;
  const loadingEdit = useSelector((store) => store.updateAccount).loading;
  const loadingEditPermission = useSelector(
    (store) => store.updatePermissionByLeaderID
  ).loading;

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item)
          .filter((i) => i !== "actions")
          .some((key) =>
            columns.filter((ele) => ele !== "actions").includes(key)
              ? false
              : (item[key] + "")
                  .toString()
                  .toLowerCase()
                  .includes(lowercasedValue)
          );
      });
      setFilteredData(filteredData);
    }
  };

  return (
    <div className="manage-intern">
      {(loadingDelete ||
        loadingAdd ||
        loadingEdit ||
        loadingEditPermission) && <SpinLoading />}
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search pointer"></i>
            <Input
              type="text"
              name="search"
              id="searchKey"
              onChange={handleSearch}
              placeholder="Search leader(s)"
            />
          </div>
        </div>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, indexRow) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={indexRow}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return renderCell(column, value, indexRow, row);
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    {[1, 2, 3, 4, 5].map((item) => {
                      return (
                        <TableCell key={item}>
                          {storeGetAllManager.loading ? (
                            <Skeleton style={{ height: 40 }} />
                          ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredData && filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
