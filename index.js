const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const connectionDB = require("./config/db");
const userRouter = require("./controller/user.controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await connectionDB();
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
});
