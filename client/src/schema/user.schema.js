import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("Required"),
  desc: yup.string().required("Required"),
  assignTo: yup.string().required("Required"),
});
