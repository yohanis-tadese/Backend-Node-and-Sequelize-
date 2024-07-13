const express = require("express");
const router = express.Router();
const { Example } = require("../models");

// GET all examples
router.get("/", async (req, res) => {
  try {
    const examples = await Example.findAll();
    res.status(200).json({
      success: true,
      message: "Fetched all examples successfully",
      data: examples,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// GET one example by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const example = await Example.findByPk(id);
    if (!example) {
      return res
        .status(404)
        .json({ success: false, message: "Example not found" });
    }
    res.status(200).json({
      success: true,
      message: "Fetched example successfully",
      data: example,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// POST create a new example
router.post("/create", async (req, res) => {
  try {
    const example = req.body;
    const createdExample = await Example.create(example);
    res.status(201).json({
      success: true,
      message: "The example is created successfully",
      data: createdExample,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// DELETE delete an example by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Example.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Example not found" });
    }
    res
      .status(200)
      .json({ success: true, message: `Deleted example with ID $ {id}` });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// PUT update an example by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExample = req.body;
    const [updatedCount] = await Example.update(updatedExample, {
      where: { id },
    });
    if (updatedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Example not found" });
    }
    res.status(200).json({
      success: true,
      message: `Updated example with ID ${id}`,
      data: updatedExample,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// PATCH partially update an example by ID
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const example = await Example.findByPk(id);
    if (!example) {
      return res
        .status(404)
        .json({ success: false, message: "Example not found" });
    }
    const updatedExample = await example.update(updatedFields);
    res.status(200).json({
      success: true,
      message: `Updated example with ID ${id}`,
      data: updatedExample,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

module.exports = router;
