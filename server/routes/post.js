const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// GET route
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll();

    res
      .status(200)
      .json({ success: true, message: "Posts retrieved successfully", posts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// POST route
router.post("/create", async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);

    res.status(201).json({
      success: true,
      message: "The post is created sucessfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Happen Error ⛔",
      error: error.message,
    });
  }
});

// GET one Posts by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Posts.findByPk(id);
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }
    res.status(200).json({
      success: true,
      message: "Fetched posts successfully",
      data: posts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

// DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Posts.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }
    res
      .status(200)
      .json({ success: true, message: `Deleted posts with ID ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error ⛔", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Find the posts by its ID
    const posts = await Posts.findByPk(id);

    // Check if the Posts exists
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }

    // Update the Posts with the new fields
    await Posts.update(updatedFields, {
      where: { id: id },
    });

    // Fetch the updated posts (optional, depends on your needs)
    const updatedPosts = await Posts.findByPk(id);

    // Respond with success message and updated posts data
    res.status(200).json({
      success: true,
      message: `Updated Posts with ID ${id}`,
      data: updatedPosts,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
