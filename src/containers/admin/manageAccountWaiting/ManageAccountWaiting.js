import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Input } from "reactstrap";
import Popup from 'components/common/core/Popup';

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
    createData("1111", "Hoang Trong Kien", "htk@gmail.com", "Android, IOS Dev", "Thua Thien Hue", "Accepted|Denied"),
    createData("2222", "Nguyen Thi Hong", "nth99@gmail.com", "Java Dev", "Quang Binh", "Accepted|Denied"),
    createData("3222", "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "Phu Yen", "Accepted|Denied"),
    createData("4222", "Phan Gia Sang", "sang99@gmail.com", "Php Dev", "Thua Thien Hue", "Accepted|Denied"),
    createData("2225", "Phan Thanh Binh", "ptb99@gmail.com", "Android Dev", "Quang Nam", "Accepted|Denied"),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function ManageAccountWaiting() {
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
    const handleConfirm = () => {
        console.log("deleted");
        console.log({ infoRow });
        // handle delete api
        setOpenModalDelete(false);
    }
    const [openModalAccept, setOpenModalAccept] = useState(false);
    const [infoRow, setInfoRow] = useState({ id: "", name: "", email: "", department: "", address: "" });
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleAction = (item, row) => {
        switch (item) {
            case "Accepted": {
                setInfoRow({ ...infoRow, id: row.id, name: row.name, email: row.email, department: row.department, address: row.address });
                setOpenModalAccept(true);
                break;
            }
            case "Denied": {
                setOpenModalDelete(true);
                setInfoRow({ ...infoRow, id: row.id, name: row.name, email: row.email, department: row.department, address: row.address });
                break;
            }
            default:
                break;
        }
    }

    const renderCell = (column, value, indexRow, row) => {
        switch (column.id) {
            case "actions": {
                const actions = value.split("|");
                return (
                    <TableCell key={column.id + " - " + indexRow} align={column.align}>
                        <div>
                            {actions.map((item, index) => {
                                return (
                                    <button key={index} style={{ margin: 5, color: 'white' }} className={`button ${item === "Accepted" ? "button--success" : "button--danger"}`}
                                        onClick={() => handleAction(item, row)}>{item}</button>
                                )
                            })}
                        </div>
                    </TableCell>
                )
            }
            default:
                return (
                    <TableCell key={column.id + " - " + indexRow} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                )
        }
    }

    return (
        <div className="manage-intern">
            <div className="manage-intern__inner">
                <div className="manage-intern__inner__top">
                    <div className="button manage-intern__inner__top__search">
                        <i className="fi-rr-search pointer"></i>
                        <Input type="text" name="search" id="searchKey" placeholder="Search account(s)" />
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={indexRow}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    renderCell(column, value, indexRow, row)
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
            {/* {openModalAdd && <ModalCUUser setOpenModal={setOpenModalAdd} title="Add account user" />}
            {openModalEdit && <ModalCUUser setOpenModal={setOpenModalEdit} title="Edit account user" infoUser={infoRow} />}
            {openModalDelete && <Popup onCancel={setOpenModalDelete} onConfirm={handleConfirm} />} */}
            {/* {openModalAdd && <ModalCUUser setOpenModal={setOpenModalAdd} title="Add account user" />} */}
            {openModalAccept && <Popup onCancel={setOpenModalAccept} onConfirm={handleConfirm} title="Are you sure you want to accept?" />}
            {openModalDelete && <Popup onCancel={setOpenModalDelete} onConfirm={handleConfirm} title="Are you sure you want to deny?" />}
        </div>
    );
}