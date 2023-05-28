import React from "react";
import { useFormik } from "formik";
import { userSchema } from "../schema/user.schema";
const EditTaskForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      assignTo: "",
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("submitted");
      console.log();
    },
  });
  return (
    <div className="flex flex-col  items-center p-12 mx-sm:p-4">
      <h2 className="text text-2xl font-semibold m-2">update task</h2>
      <form onSubmit={formik.handleSubmit} className=" flex flex-col p-12 border rounded-md ">
        <div>
          <label htmlFor="name">name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="border p-2 rounded-md"
          />
        </div>
        <br />
        <div>
          <label htmlFor="desc">description</label>
          <br />
          <input
            type="text"
            name="desc"
            value={formik.values.desc}
            className="border p-2 rounded-md"
            onChange={formik.handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="assign">assign</label>
          <br />
          <input
            type="text"
            name="assignTo"
            value={formik.values.assignTo}
            onChange={formik.handleChange}
            className="border p-2 rounded-md"
          />
        </div>
        <br />
        <div className="flex flex-col items-start">
          <button
            type="submit"
            className="border py-2 px-3 text-xs text-bold rounded-md text-cyan-50 bg-blue-500"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
