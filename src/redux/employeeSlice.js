import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://interviewtesting.onrender.com/v1/users";

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get(`${BASE_URL}/employee/list`);
    return response.data.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await axios.delete(`${BASE_URL}/employee-remove/${id}`);
    return id;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.list = state.list.filter((emp) => emp._id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
