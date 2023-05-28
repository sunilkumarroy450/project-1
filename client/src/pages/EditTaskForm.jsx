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
      console.log()
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="border">
        <div>
          <label htmlFor="name">name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            className="border"
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
            className="border"
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
            className="border"
          />
        </div>
        <br />
        <div>
          <button type="submit" className="border">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
