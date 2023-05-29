import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../schema/user.schema";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, updateTask } from "../redux/features/taskSlice";
import { ClipLoader } from "react-spinners";

const EditTaskForm = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { singleTask } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getSingleTask(id));
    }
  }, [id]);
  console.log(singleTask,"Edit Page single Task")
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: singleTask.name,
      desc: singleTask.desc,
      assignTo: singleTask.assignTo,
    },
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);
      const payload = {
        name: values.name,
        desc: values.desc,
        assignTo: values.assignTo,
      };
      dispatch(updateTask({ id, payload }));
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 200);
      setLoading(false);
      setSubmitting(false);
    },
  });

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return (
      <ClipLoader
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  return (
    <div className="flex flex-col  items-center p-12 mx-sm:p-4">
      <h2 className="text text-2xl font-semibold m-2">update task</h2>
      <form
        onSubmit={formik.handleSubmit}
        className=" flex flex-col p-12 border rounded-md "
      >
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
            disabled={formik.isSubmitting}
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
