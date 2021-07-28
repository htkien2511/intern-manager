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
import { Button, Input } from "reactstrap";
import ModalCUUser from "./ModalCUUser";
import ModalCreateAccount from "./ModalCreateAccount";
import Popup from "components/common/core/Popup";
import { getAllUser } from "redux/actions/admin/getAllUser";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "redux/actions/admin/deleteUser";
import { toast } from "react-toastify";
import SpinLoading from "components/common/core/SpinLoading";
import { Empty } from "antd";
import { setTitle } from "redux/actions/admin/setTitle";
import { getAuth } from "utils/helpers";
import ErrorPage from "components/common/ErrorPage";
import { getAllUserByLeader } from "redux/actions/admin/getAllUserByLeader";

function createData(id, name, email, gender, department, address, actions) {
  if (getAuth().role !== "ROLE_ADMIN")
    return { id, name, email, gender, department, address };
  return { id, name, email, gender, department, address, actions };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ManageIntern() {
  // eslint-disable-next-line
  const columns =
    getAuth().role === "ROLE_ADMIN"
      ? [
          { id: "id", label: "Id", minWidth: 80 },
          { id: "name", label: "Name", minWidth: 100 },
          {
            id: "email",
            label: "Email",
            minWidth: 170,
            align: "left",
          },
          {
            id: "gender",
            label: "Gender",
            minWidth: 100,
            align: "center",
          },
          {
            id: "department",
            label: "Department",
            minWidth: 100,
            align: "center",
          },
          {
            id: "address",
            label: "Address",
            minWidth: 170,
            align: "center",
          },
          {
            id: "actions",
            label: "Actions",
            minWidth: 160,
            align: "center",
          },
        ]
      : [
          { id: "id", label: "Id", minWidth: 80 },
          { id: "name", label: "Name", minWidth: 100 },
          {
            id: "email",
            label: "Email",
            minWidth: 170,
            align: "left",
          },
          {
            id: "gender",
            label: "Gender",
            minWidth: 100,
            align: "center",
          },
          {
            id: "department",
            label: "Department",
            minWidth: 100,
            align: "center",
          },
          {
            id: "address",
            label: "Address",
            minWidth: 170,
            align: "center",
          },
        ];
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const getProfileLeader = useSelector((store) => store.getProfileLeader)?.data;

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    setPermissions(
      getProfileLeader?.data?.permissionDomains.map((item) =>
        item.name.substring(7)
      ) || []
    );
  }, [getProfileLeader]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Manage Intern"));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleConfirm = () => {
    deleteUser(infoRow.id, (res) => {
      if (res.success) {
        const usersRemain = data.filter((item) => item.id !== infoRow.id);
        setData(usersRemain);
        toast.success(`Deleted user ${infoRow.name}`);
      } else {
        toast.error(res.message);
      }
    });
    setOpenModalDelete(false);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [infoRow, setInfoRow] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    department: "",
    address: "",
  });
  const storeGetAllUser = useSelector((store) => store.getAllUser);
  const storeGetAllUserByLeader = useSelector(
    (store) => store.getAllUserByLeader
  );
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleAction = (item, row) => {
    switch (item) {
      case "Edit": {
        if (
          !(permissions.includes("EditUser") || getAuth().role === "ROLE_ADMIN")
        ) {
          toast.error("Sorry, you are not authorized to edit intern.");
          return;
        }
        setInfoRow({
          ...infoRow,
          id: row.id,
          name: row.name,
          email: row.email,
          gender: row.gender,
          department: row.department,
          address: row.address,
        });
        setOpenModalEdit(true);
        break;
      }
      case "Delete": {
        if (
          !(
            permissions.includes("DeleteUser") ||
            getAuth().role === "ROLE_ADMIN"
          )
        ) {
          toast.error("Sorry, you are not authorized to delete intern.");
          return;
        }
        setOpenModalDelete(true);
        setInfoRow({
          ...infoRow,
          id: row.id,
          name: row.name,
          email: row.email,
          gender: row.gender,
          department: row.department,
          address: row.address,
        });
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      !(permissions.includes("GetAllUsers") || getAuth().role === "ROLE_ADMIN")
    )
      return;
    let arr = [];
    if (getAuth().role === "ROLE_ADMIN") {
      getAllUser((data) => {
        if (data.data) {
          data.data.forEach((item) => {
            arr.push(
              createData(
                item.id,
                item.name,
                item.email,
                item.gender,
                item.department,
                item.address,
                "Edit|Delete"
              )
            );
          });
          setData(arr.sort((a, b) => (a.id > b.id ? 1 : -1)));
        }
      });
    } else if (getAuth().role === "ROLE_MANAGER") {
      getAllUserByLeader((data) => {
        if (data.data) {
          data.data.forEach((item) => {
            arr.push(
              createData(
                item.id,
                item.name,
                item.email,
                item.gender,
                item.department,
                item.address,
                "Edit|Delete"
              )
            );
          });
          setData(arr.sort((a, b) => (a.id > b.id ? 1 : -1)));
        }
      });
    }

    // eslint-disable-next-line
  }, [permissions]);

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        const actions = value && value.split("|");
        if (getAuth().role !== "ROLE_ADMIN") return <></>;
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              {actions &&
                actions.map((item, index) => {
                  return (
                    <button
                      key={index}
                      style={{ margin: 5, color: "white" }}
                      className={`button ${
                        item === "Edit" ? "button--secondary" : "button--danger"
                      }`}
                      onClick={() => handleAction(item, row)}
                    >
                      {item}
                    </button>
                  );
                })}
            </div>
          </TableCell>
        );
      }
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

  const loadingCreate = useSelector((store) => store.register).loading;
  const loadingDelete = useSelector((store) => store.deleteUser).loading;
  const loadingEdit = useSelector((store) => store.updateAccount).loading;

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item)
          .filter((i) => i !== "actions")
          .some((key) =>
            columns.includes(key)
              ? false
              : (item[key] + "").toString().toLowerCase().includes(searchText)
          );
      });
      setFilteredData(filteredData);
    }
  }, [searchText, data, columns]);

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    setSearchText(lowercasedValue);
  };

  return (
    <div className="manage-intern">
      {(loadingCreate || loadingDelete || loadingEdit) && <SpinLoading />}
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          {getAuth().role === "ROLE_ADMIN" && (
            <div
              className="manage-intern__inner__top__button--add"
              onClick={() => {
                if (
                  !(
                    permissions.includes("CreateUser") ||
                    getAuth().role === "ROLE_ADMIN"
                  )
                ) {
                  toast.error(
                    "Sorry, you are not authorized to create intern."
                  );
                  return;
                }
                setOpenModalAdd(true);
              }}
            >
              <Button className="button manage-intern__inner__top__button--add__btn">
                General Intern
              </Button>
              <i className="fi-rr-plus"></i>
            </div>
          )}

          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search pointer"></i>
            <Input
              type="text"
              name="search"
              id="searchKey"
              onChange={handleSearch}
              placeholder="Search intern(s)"
            />
          </div>
        </div>
        {permissions.includes("GetAllUsers") ||
        getAuth().role === "ROLE_ADMIN" ? (
          <>
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                        {(getAuth().role === "ROLE_ADMIN"
                          ? [1, 2, 3, 4, 5, 6, 7]
                          : [1, 2, 3, 4, 5, 6]
                        ).map((item) => {
                          return (
                            <TableCell key={item}>
                              {storeGetAllUser.loading ||
                              storeGetAllUserByLeader.loading ? (
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
          </>
        ) : (
          <ErrorPage message="Sorry, you are not authorized to get data this page." />
        )}
      </div>
      {openModalAdd && (
        <ModalCreateAccount
          setOpenModal={setOpenModalAdd}
          title="Add account user"
          setData={setData}
        />
      )}
      {openModalEdit && (
        <ModalCUUser
          setOpenModal={setOpenModalEdit}
          title="Edit account user"
          infoUser={infoRow}
          setData={setData}
        />
      )}
      {openModalDelete && (
        <Popup
          onCancel={setOpenModalDelete}
          onConfirm={handleConfirm}
          title="Are you sure to delete this intern?"
        />
      )}
    </div>
  );
}
