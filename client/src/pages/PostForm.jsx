import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userSchema } from "../schema/user.schema";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTask } from "../redux/features/taskSlice";
const PostForm = () => {
  const task = useSelector((store) => store);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTask());
  // }, []);
  console.log(task, "task");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      desc: "",
      assignTo: "",
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      const payload = {
        name: values.name,
        desc: values.desc,
        assignTo: values.assignTo,
      };
      dispatch(addTask(payload));
      resetForm();
    },
  });
  return (
    <div className="flex flex-row w-full items-center h-screen">
      <div className="w-6/12  h-screen m-auto content-center max-sm:w-full">
        <div className="flex flex-row p-4">
          <img
            src="https://res.cloudinary.com/blinklink-solutions/image/upload/v1562090581/60292_cr_cr_bmfn3c.png"
            alt="logo"
            className="w-16 max-sm:w-12"
          />
          <h1 className="text text-3xl p-2 max-sm:text-xl">
            BlinkLink Solution
          </h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center p-16 max-sm:justify-center"
        >
          <h1 className="font-semibold text-2xl py-3 mr-24 max-sm:text-lg">
            Add-Task
          </h1>
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
              value={formik.values.name}
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
              value={formik.values.desc}
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
              value={formik.values.assignTo}
              type="text"
              className="p-2 rounded-sm border border-gray-400"
            />
          </div>
          <br />
          <div className=" border-red-400 flex justify-start w-4/12 max-sm:w-0 max-sm:justify-center">
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className=" p-2 px-5 max-sm: rounded-sm border-solid bg-blue-600 text-xs font-medium text-white "
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div className="w-6/12 max-sm:hidden">
        <img
          src="/banner.jpg"
          alt="banner"
          className="w-fit h-screen object-cover "
        />
      </div>
    </div>
  );
};

export default PostForm;
