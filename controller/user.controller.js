const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/", async (req, res) => {
  try {
    const userTasks = await User.find();
    return res.status(200).send(userTasks);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//post
router.post("/create", async (req, res) => {
  try {
    const { name, desc, assignTo } = req.body;
    const user = new User({ name, desc, assignTo });
    await user.save();
    return res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get:id
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//put
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, assignTo } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        desc,
        assignTo,
      },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
