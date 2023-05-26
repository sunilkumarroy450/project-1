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
  },
});

export default taskSlice.reducer;
