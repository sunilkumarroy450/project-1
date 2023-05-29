import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
  tasks: [],
  loading: false,
  singleTask: {},
};

export const getTask = createAsyncThunk("getTask", async () => {
  try {
    const res = await axios.get(`http://localhost:8080/users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getSingleTask = createAsyncThunk("getSingleTask", async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/users/get/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const addTask = createAsyncThunk("addTask", async (payload) => {
  try {
    const res = await axios.post(`http://localhost:8080/users/create`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ id, payload }) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/users/update/${id}`,
        payload
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/users/delete/${id}`);
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
      state.loading = false;
      // state.tasks = state.tasks.push(action.payload);
    },
    [addTask.rejected]: (state) => {
      state.loading = false;
    },
    [deleteTask.pending]: (state) => {
      state.loading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((item) => item._id !== action.payload);
    },
    [deleteTask.rejected]: (state) => {
      state.loading = false;
    },
    [updateTask.pending]: (state) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      const updatedIndex = state.tasks.findIndex(
        (item) => item._id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = action.payload;
      }
      state.loading = false;
    },
    [updateTask.rejected]: (state) => {
      state.loading = false;
    },
    [getSingleTask.pending]: (state) => {
      state.loading = true;
    },
    [getSingleTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleTask = action.payload;
    },
    [getSingleTask.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default taskSlice.reducer;
