import { Routes, Route } from "react-router-dom";

import React from "react";
import TaskItem from "../pages/table/TaskItem";
import EditTaskForm from "../pages/EditTaskForm";
import PostForm from "../pages/PostForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskItem />} />
      <Route path="/update/:id" element={<EditTaskForm />} />
      <Route path="/add" element={<PostForm />} />
    </Routes>
  );
};

export default AllRoutes;
