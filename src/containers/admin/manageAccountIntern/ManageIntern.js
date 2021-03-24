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
import { Button, Input } from "reactstrap";

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
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'left',
    },
];

function createData(id, name, email, department, address, actions) {
    return { id, name, email, department, address, actions };
}

const rows = [
    createData(0, "Hoang Trong Kien", "htk@gmail.com", "Android, IOS Dev", "Thua Thien Hue", "Edit|Delete"),
    createData(1, "Nguyen Thi Hong", "nth99@gmail.com", "Java Dev", "Quang Binh", "Edit|Delete"),
    createData(2, "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "Phu Yen", "Edit|Delete"),
    createData(3, "Phan Gia Sang", "sang99@gmail.com", "Php Dev", "Thua Thien Hue", "Edit|Delete"),
    createData(4, "Phan Thanh Binh", "ptb99@gmail.com", "Android Dev", "Quang Nam", "Edit|Delete"),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ManageIntern() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                    <div className="manage-intern__inner__top__button--add">
                        <Button className="button manage-intern__inner__top__button--add__btn">General Account</Button>
                        <i class="fi-rr-plus"></i>
                    </div>
                    <div className="button manage-intern__inner__top__search">
                        <i class="fi-rr-search"></i>
                        <Input type="text" name="search" id="searchKey" placeholder="Search accounts" />
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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