import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";

const BASE_URL = "https://interviewtesting.onrender.com/v1/users";

const EmployeeUpdate = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [updatedData, setUpdatedData] = useState({ fullName: "", email: "", phone: "", image: "", age: "", salary: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/employee/${id}`)
            .then(response => {
                const employeeData = response.data;
                console.log("Fetched Employee Data:", employeeData);
                setEmployee(employeeData);
                setUpdatedData({
                    fullName: employeeData.fullName || "",
                    email: employeeData.email || "",
                    phone: employeeData.phone || "",
                    image: employeeData.image || "",
                    age: employeeData.age || "",
                    salary: employeeData.salary || ""
                });
            })
            .catch(error => {
                console.error("Error fetching employee details", error);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedPayload = {
            ...updatedData,
            age: Number(updatedData.age),
            salary: Number(updatedData.salary)
        };

        axios.put(`${BASE_URL}/employee-update/${id}`, updatedPayload)
            .then(() => {
                navigate("/");
            })
            .catch(error => console.error("Error updating employee", error));
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Update Employee: {employee.fullName}
                <img src={employee.image || "dummy_image_url"} alt="employee" width="50" />
            </Typography>
            <form onSubmit={handleUpdate}>
                <div>
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.fullName}
                        onChange={(e) => setUpdatedData({ ...updatedData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.email}
                        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.phone}
                        onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.image}
                        onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label="Age"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.age}
                        onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
                        type="number"
                    />
                </div>
                <div>
                    <TextField
                        label="Salary"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={updatedData.salary}
                        onChange={(e) => setUpdatedData({ ...updatedData, salary: e.target.value })}
                        type="number"
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                   <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Update Employee
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Go To Employee List
                </Button> 
                </div>
                
            </form>
        </div>
    );
};

export default EmployeeUpdate;
