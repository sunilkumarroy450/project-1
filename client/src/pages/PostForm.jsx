import React from "react";
import { useFormik } from "formik";
import { userSchema } from "../schema/user.schema";

const PostForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      assignTo: "",
    },
    validationSchema: userSchema,
    onSubmit: () => {
      console.log("submitted");
    },
  });
  console.log(formik);
  return (
    <div className="flex flex-row w-full items-center h-screen">
      <div className="w-6/12 border border-red-500 h-screen m-auto content-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <h1 className="font-extrabold">ADD Task</h1>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              name="name"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm "
            />
          </div>
          <div>
            <label htmlFor="desc">description</label>
            <br />
            <input
              name="desc"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm"
            />
          </div>
          <div>
            <label htmlFor="assignTo">assign</label>
            <br />
            <input
              name="assignTo"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm border border-black"
            />
          </div>
          <div>
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="p-2 rounded-md border-solid bg-blue-600 text-sm text-white"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div className="w-6/12 ">
        <img
          src="/banner.jpg"
          alt="banner"
          className="w-fit h-screen bg-cover"
        />
      </div>
    </div>
  );
};

export default PostForm;
