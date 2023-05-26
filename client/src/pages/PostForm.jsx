import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userSchema } from "../schema/user.schema";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../redux/features/taskSlice";
const PostForm = () => {
  const task = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
  }, []);
  console.log(task);
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
      <div className="w-6/12 border border-blue-500 h-screen m-auto content-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center border border-red-950"
        >
          <h1 className="font-semibold text-3xl float-left">ADD Task</h1>
          <div>
            <label className="text text-sm font-medium" htmlFor="name">
              Name <span className="text text-red-700">*</span>
            </label>
            <br />
            <input
              name="name"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm border border-gray-400"
            />
          </div>
          <div>
            <label className="text text-sm font-medium" htmlFor="desc">
              Description <span className="text text-red-700">*</span>
            </label>
            <br />
            <input
              name="desc"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm border border-gray-400"
            />
          </div>
          <div>
            <label className="text text-sm font-medium" htmlFor="assignTo">
              Assign <span className="text text-red-700">*</span>
            </label>
            <br />
            <input
              name="assignTo"
              onChange={formik.handleChange}
              type="text"
              className="p-2 rounded-sm border border-gray-400"
            />
          </div>
          <br />
          <div className=" border-red-400 flex justify-start w-4/12">
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className=" p-2 px-3 ml-5 rounded-sm border-solid bg-blue-600 text-xs font-medium text-white "
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
          className="w-fit h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default PostForm;
