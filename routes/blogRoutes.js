const express = require("express");
const { createBlog, getPublishedBlogs,getSinglePublishedBlog,getUserBlogs, updateBlog,deleteBlog } = require("../controllers/blogController");
const { authenticate } = require("../middlewares/authmiddleware");
const { validateBlog } = require("../middlewares/validationMiddleware");
const router = express.Router();

router.post("/", authenticate, validateBlog, createBlog);
router.get("/", getPublishedBlogs);
router.get("/:id", getSinglePublishedBlog);
router.get("/User", authenticate, getUserBlogs);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

module.exports = router;
