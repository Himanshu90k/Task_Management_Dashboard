import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

enum TaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    OVERDUE = "OVERDUE",
};

interface Task {
    _id: string; 
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
};

type TaskState = Task[];

const initialState: TaskState = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        //add task
        builder
        .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
          state.push(action.payload);
          console.log(state, action.payload)
        }); 

        //delete task
        builder
        .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
          state = state.filter((task) => task._id !== action.payload);
        });

        //update task
        builder
        .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
          state = state.filter((task) => task._id === action.payload._id? action.payload : task);
        });

        //get tasks
        builder
        .addCase(getTasksAsync.fulfilled, (state, action: PayloadAction<TaskState>) => {
          state.push(...action.payload);
        });

        //change status
        builder
        .addCase(changeStatusAsync.fulfilled, (state, action: PayloadAction<Task>) => {
          state = state.filter((task) => task._id === action.payload._id? task.status = action.payload.status : task);
        });
    },
});

const baseUrl = 'http://localhost:5000/api';

export const addTaskAsync = createAsyncThunk(
    "task/addTaskAsync",
    async (task: Task, { rejectWithValue }) => {
        try {
          const response = await axios.post(`${baseUrl}/add-task/`, task);
          return response.data as Task;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    "task/deleteTaskAsync",
    async (_id: string, { rejectWithValue }) => {
        try {
          const response = await axios.delete(`${baseUrl}/delete-task/${_id}`);
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
    }
);

export const updateTaskAsync = createAsyncThunk(
    "task/updateTaskAsync",
    async (task: Task, { rejectWithValue }) => {
        try {
          // Simulate async logic
          const response = await axios.put(`${baseUrl}/update-task/${task._id}`, task);
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
    }
);

export const getTasksAsync = createAsyncThunk(
    "task/getTasksAsync",
    async (_, { rejectWithValue }) => {
        try {
          // Simulate async logic
          const response = await axios.get(`${baseUrl}/get-tasks`);
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
    }
);

export const changeStatusAsync = createAsyncThunk(
    "task/changeStatusAsync",
    async ({ _id, status }: { _id: string; status: TaskStatus }, { rejectWithValue }) => {
        try {
          // Simulate async logic
          const response = await axios.put(`${baseUrl}/change-status/${_id}`, status);
          return response.data;
        } catch (error: any) {
          return rejectWithValue(error.message);
        }
    }
);

export const {} = taskSlice.actions;

export default taskSlice.reducer;