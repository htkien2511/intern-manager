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
import { Button, Input } from "reactstrap";
import ModalCUUser from "./ModalCUUser";
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
    createData("1111", "Hoang Trong Kien", "htk@gmail.com", "Android, IOS Dev", "Thua Thien Hue", "Edit|Delete"),
    createData("2222", "Nguyen Thi Hong", "nth99@gmail.com", "Java Dev", "Quang Binh", "Edit|Delete"),
    createData("3222", "Phan Trong Duc", "trongduc.iter@gmail.com", "Frontend Dev", "Phu Yen", "Edit|Delete"),
    createData("4222", "Phan Gia Sang", "sang99@gmail.com", "Php Dev", "Thua Thien Hue", "Edit|Delete"),
    createData("2225", "Phan Thanh Binh", "ptb99@gmail.com", "Android Dev", "Quang Nam", "Edit|Delete"),
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
    const handleConfirm = () => {
        // handle delete api
        setOpenModalDelete(false);
    }
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [infoRow, setInfoRow] = useState({ id: "", name: "", email: "", department: "", address: "" });
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleAction = (item, row) => {
        switch (item) {
            case "Edit": {
                setInfoRow({ ...infoRow, id: row.id, name: row.name, email: row.email, department: row.department, address: row.address });
                setOpenModalEdit(true);
                break;
            }
            case "Delete": {
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
                                    <button key={index} style={{ margin: 5, color: 'white' }} className={`button ${item === "Edit" ? "button--secondary" : "button--danger"}`}
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
                    <div className="manage-intern__inner__top__button--add" onClick={() => setOpenModalAdd(true)}>
                        <Button className="button manage-intern__inner__top__button--add__btn">General Account</Button>
                        <i className="fi-rr-plus"></i>
                    </div>
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
            {openModalAdd && <ModalCUUser setOpenModal={setOpenModalAdd} title="Add account user" />}
            {openModalEdit && <ModalCUUser setOpenModal={setOpenModalEdit} title="Edit account user" infoUser={infoRow} />}
            {openModalDelete && <Popup onCancel={setOpenModalDelete} onConfirm={handleConfirm} title="Are you delete this user?"/>}
        </div>
    );
}