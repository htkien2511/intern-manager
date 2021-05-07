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
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { acceptUserRegister } from "redux/actions/admin/acceptUserRegister";
import { denyUserRegister } from "redux/actions/admin/deniedUserRegister";
import { Empty } from "antd";
import SpinLoading from "components/common/core/SpinLoading";
import { toast } from "react-toastify";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
  },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    align: "left",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "left",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "left",
  },
];

function createData(id, name, email, department, address, actions) {
  return { id, name, email, department, address, actions };
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
              item.department,
              item.address,
              "Accepted|Denied"
            )
          );
        });
        setData(arr);
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

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item).some((key) =>
          columns.includes(key)
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

  const [openModalAccept, setOpenModalAccept] = useState(false);
  const [infoRow, setInfoRow] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    address: "",
  });
  const [openModalDelete, setOpenModalDelete] = useState(false);
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

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        const actions = value.split("|");
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              {actions.map((item, index) => {
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
            {column.format && typeof value === "number"
              ? column.format(value)
              : value}
          </TableCell>
        );
    }
  };

  const storeAccepted = useSelector((store) => store.acceptUserRegister);
  const storeDenied = useSelector((store) => store.deniedUserRegister);

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
                    {[1, 2, 3, 4, 5, 6].map((item) => {
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
          title="Are you sure you want to accept?"
        />
      )}
      {openModalDelete && (
        <Popup
          onCancel={setOpenModalDelete}
          onConfirm={handleConfirmDenied}
          title="Are you sure you want to deny?"
        />
      )}
    </div>
  );
}
