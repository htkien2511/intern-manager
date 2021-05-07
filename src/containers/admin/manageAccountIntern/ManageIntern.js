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
import { useSelector } from "react-redux";
import { deleteUser } from "redux/actions/admin/deleteUser";
import { toast } from "react-toastify";
import SpinLoading from "components/common/core/SpinLoading";
import { Empty } from "antd";

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

export default function ManageIntern() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    department: "",
    address: "",
  });
  const storeGetAllUser = useSelector((store) => store.getAllUser);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleAction = (item, row) => {
    switch (item) {
      case "Edit": {
        setInfoRow({
          ...infoRow,
          id: row.id,
          name: row.name,
          email: row.email,
          department: row.department,
          address: row.address,
        });
        setOpenModalEdit(true);
        break;
      }
      case "Delete": {
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
    let arr = [];
    getAllUser((data) => {
      if (data.data) {
        data.data.forEach((item) => {
          arr.push(
            createData(
              item.id,
              item.name,
              item.email,
              item.department,
              item.address,
              "Edit|Delete"
            )
          );
        });
        setData(arr);
      }
    });
  }, []);

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        const actions = value.length && value.split("|");
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              {actions.map((item, index) => {
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
            {column.format && typeof value === "number"
              ? column.format(value)
              : value}
          </TableCell>
        );
    }
  };

  const loadingCreate = useSelector((store) => store.register).loading;
  const loadingDelete = useSelector((store) => store.deleteUser).loading;

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item).some((key) =>
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
      {(loadingCreate || loadingDelete) && <SpinLoading />}
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          <div
            className="manage-intern__inner__top__button--add"
            onClick={() => setOpenModalAdd(true)}
          >
            <Button className="button manage-intern__inner__top__button--add__btn">
              General Account
            </Button>
            <i className="fi-rr-plus"></i>
          </div>
          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search pointer"></i>
            <Input
              type="text"
              name="search"
              id="searchKey"
              onChange={handleSearch}
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
                          {storeGetAllUser.loading ? (
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
          title="Are you delete this user?"
        />
      )}
    </div>
  );
}
