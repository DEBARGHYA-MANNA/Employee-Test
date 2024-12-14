import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";

const BASE_URL = "https://interviewtesting.onrender.com/v1/users";

const EmployeeCreate = () => {
    const [newEmployee, setNewEmployee] = useState({
        fullName: "",
        email: "",
        phone: "",
        image: "",
        age: "",
        salary: ""
    });

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/employee/create`, newEmployee)
            .then(() => {
                alert("Employee Created Successfully");
            })
            .catch(error => console.error("Error creating employee", error));
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Create New Employee</Typography>
            <form onSubmit={handleCreate}>
                <div>
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.fullName}
                        onChange={(e) => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.image}
                        onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Age"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.age}
                        onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Salary"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newEmployee.salary}
                        onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Create Employee
                </Button>
            </form>
        </div>
    );
};

export default EmployeeCreate;
