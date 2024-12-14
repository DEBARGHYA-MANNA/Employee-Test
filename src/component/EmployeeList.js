import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../redux/employeeSlice";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list: employees, status, error } = useSelector((state) => state.employees);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, status]);

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h4" gutterBottom>Employee List</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/employee/create")}
                >
                    Create New Employee
                </Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.fullName}</TableCell>
                                <TableCell>{employee.age}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>
                                    <img src={employee.image || "dummy_image_url"} alt="employee" width="50" />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate(`/employee/update/${employee._id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EmployeeList;
