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
import { useHistory } from "react-router";
import { ROUTE_MANAGE_PROJECT_DETAIL } from "../../../utils/routes";
import { Input, Button } from "reactstrap";
import ModalAddProject from "./ModalAddProject";
import { useSelector } from "react-redux";
import { Empty, Skeleton } from "antd";
import { getAllProject } from "redux/actions/admin/getAllProject";
import moment from "moment";
import DropPanel from "components/common/core/DropPanel";
import { MoreOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import SpinLoading from "components/common/core/SpinLoading";
// import { getAllUserAssignedProject } from "redux/actions/admin/getAllUserAssignedProject";
import AvatarBlock from "components/common/core/AvatarBlock";

const columns = [
  { id: "projectID", label: "Project ID", minWidth: 60 },
  { id: "title", label: "Project Name", align: "left", minWidth: 120 },
  {
    id: "description",
    label: "Descriptions",
    minWidth: 140,
    align: "left",
  },
  {
    id: "managerName",
    label: "Manager Name",
    minWidth: 80,
    align: "left",
  },
  {
    id: "usersAssigned",
    label: "Users assigned",
    minWidth: 160,
    align: "left",
  },
  {
    id: "startDate",
    label: "Created Date",
    minWidth: 90,
    align: "left",
  },
  {
    id: "dueDate",
    label: "Due Date",
    minWidth: 90,
    align: "left",
  },
  {
    id: "actions",
    label: "",
    minWidth: 90,
    align: "center",
  },
];

function createData(
  projectID,
  title,
  description,
  managerName,
  usersAssigned,
  startDate,
  dueDate,
  actions
) {
  return {
    projectID,
    title,
    description,
    managerName,
    usersAssigned,
    startDate,
    dueDate,
    actions,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ManageProject() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();
  const [openModalAdd, setOpenModalAdd] = useState();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const storeGetAllProject = useSelector((store) => store.getAllProject);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let arr = [];
    getAllProject((res) => {
      if (res.success) {
        res.data.forEach((item) => {
          // getAllUserAssignedProject(Number(item.projectId), (r) => {
          // if (r.success) {
          arr.push(
            createData(
              item.projectId,
              item.title,
              item.description,
              item.managerName,
              "PhanTrongDuc,NguyenHong,PhanThanhBinh,Kien,Sang",
              // r.data.map((i) => i.name).join(","),
              item.startDate,
              item.dueDate,
              "More"
            )
          );
          setData(arr);
          // }
          // });
        });
      } else {
        toast.error(res.message);
      }
    });
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // const [openModalAccept, setOpenModalAccept] = useState(false);
  // const [openModalDelete, setOpenModalDelete] = useState(false);
  // const [infoRow, setInfoRow] = useState({
  //   id: "",
  //   name: "",
  //   email: "",
  //   department: "",
  //   address: "",
  // });

  // const handleAction = (item, row) => {
  //   switch (item) {
  //     case "Edit": {
  //       setInfoRow({
  //         ...infoRow,
  //         id: row.id,
  //         name: row.name,
  //         email: row.email,
  //         department: row.department,
  //         address: row.address,
  //       });
  //       setOpenModalAccept(true);
  //       break;
  //     }
  //     case "Denied": {
  //       setOpenModalDelete(true);
  //       setInfoRow({
  //         ...infoRow,
  //         id: row.id,
  //         name: row.name,
  //         email: row.email,
  //         department: row.department,
  //         address: row.address,
  //       });
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };

  const handleSearch = (event) => {
    const lowercasedValue = event.target.value.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item)
          .filter((i) => i !== "actions")
          .some((key) =>
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

  const renderCell = (column, value, indexRow, row) => {
    switch (column.id) {
      case "actions": {
        return (
          <TableCell key={column.id + " - " + indexRow} align={column.align}>
            <div>
              <DropPanel>
                <DropPanel.Trigger>
                  {({ toggle }) => (
                    <MoreOutlined
                      onClick={() => {
                        toggle();
                      }}
                    />
                  )}
                </DropPanel.Trigger>
                <DropPanel.Content>
                  {({ hide }) => (
                    <div className="manager-project__menu-more" onClick={hide}>
                      <div className="manager-project__menu-more__inner">
                        <div
                          onClick={() =>
                            history.push(ROUTE_MANAGE_PROJECT_DETAIL)
                          }
                        >
                          See tasks
                        </div>
                        <div>Edit project</div>
                        <div>Delete project</div>
                      </div>
                    </div>
                  )}
                </DropPanel.Content>
              </DropPanel>
            </div>
          </TableCell>
        );
      }
      case "dueDate": {
        return (
          <TableCell key={column.id + " - " + indexRow}>
            {moment(value).format("YYYY-MM-DD")}
          </TableCell>
        );
      }
      case "usersAssigned": {
        return (
          <TableCell key={column.id + " - " + indexRow}>
            <AvatarBlock users_list={value.split(",")} />
          </TableCell>
        );
      }
      case "startDate": {
        return (
          <TableCell key={column.id + " - " + indexRow}>
            {moment(value).format("YYYY-MM-DD")}
          </TableCell>
        );
      }
      case "description": {
        return (
          <TableCell key={column.id + " - " + indexRow}>
            {value.split(";").join(",")}
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

  const storeCreateProject = useSelector((store) => store.createProject);

  return (
    <div className="manage-intern">
      {storeCreateProject.loading && <SpinLoading />}
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search"></i>
            <Input
              type="text"
              name="search"
              onChange={handleSearch}
              id="searchKey"
              placeholder="Search project(s)"
            />
          </div>
          <div
            className="manage-intern__inner__top__button--add"
            onClick={() => setOpenModalAdd(true)}
          >
            <Button className="button manage-intern__inner__top__button--add__btn">
              Create Project
            </Button>
            <i className="fi-rr-plus"></i>
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
                          // onClick={() => {
                          //   history.push(ROUTE_MANAGE_PROJECT_DETAIL);
                          // }}
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
                          {storeGetAllProject.loading ? (
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
      {openModalAdd && (
        <ModalAddProject
          setOpenModal={setOpenModalAdd}
          title="Form create project"
          setData={setData}
        />
      )}
    </div>
  );
}
