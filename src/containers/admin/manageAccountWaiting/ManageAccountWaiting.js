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
import Popup from "components/common/core/Popup";
import { getAllAccountWaiting } from "redux/actions/admin/getAllAccountWaiting";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { acceptUserRegister } from "redux/actions/admin/acceptUserRegister";
import { denyUserRegister } from "redux/actions/admin/deniedUserRegister";
import { Empty } from "antd";
import SpinLoading from "components/common/core/SpinLoading";
import { toast } from "react-toastify";
import { Checkbox } from "@material-ui/core";
import { setTitle } from "redux/actions/admin/setTitle";

const columns = [
  { id: "id", label: "Id", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 180,
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
];

function createData(id, name, email, gender, department, address, actions) {
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

export default function ManageAccountWaiting() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const storeGetAllAccountWaiting = useSelector(
    (store) => store.getAllAccountWaiting
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Manage Account Waiting"));
  }, [dispatch]);

  useEffect(() => {
    let arr = [];
    getAllAccountWaiting((res) => {
      if (res.success) {
        res.data.forEach((item) => {
          arr.push(
            createData(
              item.id,
              item.name,
              item.email,
              item.gender,
              item.department,
              item.address,
              "Accepted|Denied|Selected"
            )
          );
        });
        setData(arr.sort((a, b) => (a.id > b.id ? 1 : -1)));
      }
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleConfirmAccepted = () => {
    const arr_user_id = [];
    arr_user_id.push(infoRow.id);
    acceptUserRegister(arr_user_id, (res) => {
      if (res.success) {
        setData(data.filter((item) => item.id !== infoRow.id));
        toast.success(`Accepted user ${infoRow.name}`);
      } else {
        toast.error(res.message);
      }
    });
    setOpenModalAccept(false);
  };

  const handleConfirmAcceptedAll = () => {
    if (!userSelected.length) return;
    acceptUserRegister(userSelected, (res) => {
      if (res.success) {
        setData(data.filter((item) => !userSelected.includes(item.id)));
        toast.success(`Accepted all user selected`);
        setUserSelected([]);
      } else {
        toast.error(res.message);
      }
    });
    setOpenModalAcceptAll(false);
  };

  const handleConfirmDenied = () => {
    const arr_user_id = [];
    arr_user_id.push(infoRow.id);
    denyUserRegister(arr_user_id, (res) => {
      if (res.success) {
        setData(data.filter((item) => item.id !== infoRow.id));
        toast.success(`Denied user ${infoRow.name}`);
      } else {
        toast.error(res.message);
      }
    });
    setOpenModalDelete(false);
  };

  const handleConfirmDeniedAll = () => {
    if (!userSelected.length) return;
    denyUserRegister(userSelected, (res) => {
      if (res.success) {
        setData(data.filter((item) => !userSelected.includes(item.id)));
        setUserSelected([]);
        toast.success(`Denied all user selected`);
      } else {
        toast.error(res.message);
      }
    });
    setOpenModalDeleteAll(false);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
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
    // setFilteredData(data);
  }, [searchText, data]);

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    setSearchText(lowercasedValue);
  };

  const [openModalAccept, setOpenModalAccept] = useState(false);
  const [openModalAcceptAll, setOpenModalAcceptAll] = useState(false);
  const [infoRow, setInfoRow] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    address: "",
  });

  const [userSelected, setUserSelected] = useState([]);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false);
  const handleAction = (item, row) => {
    switch (item) {
      case "Accepted": {
        setInfoRow({
          ...infoRow,
          id: row.id,
          name: row.name,
          email: row.email,
          department: row.department,
          address: row.address,
        });
        setOpenModalAccept(true);
        break;
      }
      case "Denied": {
        setOpenModalDelete(true);
        setInfoRow({
          ...infoRow,
          id: row.id,
          name: row.name,
          email: row.email,
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
    setUserSelected(
      userSelected.filter((item) =>
        filteredData.map((i) => i.id).includes(item)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const handleChangeCheckbox = (e, item) => {
    if (e.target.checked) {
      setUserSelected([...userSelected, item]);
    } else {
      setUserSelected(userSelected.filter((ele) => ele !== item));
    }
  };

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        const actions = value.split("|");
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              {actions.map((item, index) => {
                if (item === "Selected")
                  return (
                    <Checkbox
                      key={index}
                      checked={userSelected.includes(row.id)}
                      onChange={(e) => handleChangeCheckbox(e, row.id)}
                    />
                  );
                return (
                  <button
                    key={index}
                    style={{ margin: 5, color: "white" }}
                    className={`button ${
                      item === "Accepted" ? "button--success" : "button--danger"
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

  const storeAccepted = useSelector((store) => store.acceptUserRegister);
  const storeDenied = useSelector((store) => store.deniedUserRegister);

  const handleChangeSelectedAll = (e) => {
    if (e.target.checked) {
      setUserSelected(data.map((item) => item.id));
    } else {
      setUserSelected([]);
    }
  };

  return (
    <div className="manage-intern">
      {((storeAccepted && storeAccepted.loading) ||
        (storeDenied && storeDenied.loading)) && <SpinLoading />}
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search pointer"></i>
            <Input
              type="text"
              name="search"
              onChange={handleSearch}
              id="searchKey"
              placeholder="Search account(s)"
            />
          </div>
          <div className="flex">
            {userSelected.length > 0 && (
              <div>
                <button
                  style={{
                    margin: 5,
                    color: "black",
                    borderRadius: 5,
                    width: "140px",
                    height: 40,
                  }}
                  className="button button--success"
                  onClick={() => setOpenModalAcceptAll(true)}
                >
                  Accepted All
                </button>
                <button
                  style={{
                    margin: 5,
                    color: "black",
                    borderRadius: 5,
                    width: "140px",
                    height: 40,
                  }}
                  className="button button--danger"
                  onClick={() => setOpenModalDeleteAll(true)}
                >
                  Denied All
                </button>
              </div>
            )}
            {filteredData.length > 0 && (
              <Checkbox
                onChange={handleChangeSelectedAll}
                checked={userSelected.length === filteredData.length}
              />
            )}
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
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                      return (
                        <TableCell key={item}>
                          {storeGetAllAccountWaiting.loading ? (
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
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {openModalAccept && (
        <Popup
          onCancel={setOpenModalAccept}
          onConfirm={handleConfirmAccepted}
          title="Are you sure to accept?"
        />
      )}
      {openModalDelete && (
        <Popup
          onCancel={setOpenModalDelete}
          onConfirm={handleConfirmDenied}
          title="Are you sure to deny?"
        />
      )}
      {openModalAcceptAll && (
        <Popup
          onCancel={setOpenModalAcceptAll}
          onConfirm={handleConfirmAcceptedAll}
          title="Are you sure to accept all user?"
        />
      )}
      {openModalDeleteAll && (
        <Popup
          onCancel={setOpenModalDeleteAll}
          onConfirm={handleConfirmDeniedAll}
          title="Are you sure to deny all user?"
        />
      )}
    </div>
  );
}
