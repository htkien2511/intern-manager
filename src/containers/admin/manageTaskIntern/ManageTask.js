import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';
import { ROUTE_MANAGE_SCHEDULE_DETAIL } from '../../../utils/routes';
import { Input } from "reactstrap";

const columns = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'department',
    label: 'Department',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'left',
  },
];

function createData(id, name, email, department, address) {
  return { id, name, email, department, address };
}

const rows = [
  createData(0, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(1, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(2, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(3, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(4, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(5, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(6, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(7, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(8, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(9, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(10, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(11, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(12, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
  createData(13, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "La Hai Dong Xuan Phu Yen"),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ManageSchedule() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="manage-intern">
      <div className="manage-intern__inner">
        <div className="manage-intern__inner__top">
          <div className="button manage-intern__inner__top__search">
            <i className="fi-rr-search"></i>
            <Input type="text" name="search" id="searchKey" placeholder="Search intern(s)" />
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indexRow) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={indexRow} onClick={() => { history.push(ROUTE_MANAGE_SCHEDULE_DETAIL) }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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