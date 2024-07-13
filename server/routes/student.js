const express = require("express");
const router = express.Router();
const { Students } = require("../models");

router.get("/", async (req, res) => {
  try {
    const student = await Students.findAll();

    res.status(200).json({
      status: "sucess",
      students: student,
    });
  } catch (err) {
    console.log("Error ⛔");
  }
});

router.post("/create", async (req, res) => {
  try {
    const student = req.body;

    await Students.create(student);

    res.status(200).json({
      status: "sucess",
      message: "Student create sucessfuly",
      students: student,
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Students.findByPk(id);

    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      status: "sucess",
      student: student,
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const student = await Students.findByPk(id);
    if (!student) {
      res.status(404).json({ success: false, message: "Students not found" });
    }

    await Students.update(updatedFields, {
      where: { id: id },
    });

    const updateStudent = await Students.findByPk(id);

    res.status(200).json({
      status: "sucess",
      student: updateStudent,
    });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
  const deleteCount =   await Students.destroy({ where: { id: id } });

  if(deleteCount === 0 ){
    res.status(404).json({message: `Student not found with this ${id } Id`})
  }

    res
      .status(200)
      .json({ status: "sucess", message: `Sucessfully deleted with id ${id}` });
  } catch (error) {
    console.log(`Error ⛔ ${error}`);
  }
});

module.exports = router;
