import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
  tasks: [],
  loading: false,
};

export const getTask = createAsyncThunk("getTask", async () => {
  try {
    const res = await axios.get(`http://localhost:8080/users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const addTask = createAsyncThunk("addTask", async (payload) => {
  console.log(payload,"payload")
  try {
    const res = await axios.post(`http://localhost:8080/users/create`,payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateTask = createAsyncThunk("updateTask", async (id) => {
  try {
    const res = await axios.put(`http://localhost:8080/users/update/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    const res = await axios.put(`http://localhost:8080/users/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const taskSlice = createSlice({
  name: "Tasks",
  initialState: initalState,
  extraReducers: {
    [getTask.pending]: (state) => {
      state.loading = true;
    },
    [getTask.fulfilled]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.tasks = action.payload;
    },
    [getTask.rejected]: (state) => {
      state.loading = false;
    },
    [addTask.pending]: (state) => {
      state.loading = true;
    },
    [addTask.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.tasks = action.payload;
    },
    [addTask.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default taskSlice.reducer;
