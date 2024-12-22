const Blog = require("../models/Blog");
const User = require("../models/User");
const calculateReadingTime = require("../utils/calculateReadingTime");


// Create Blog
exports.createBlog = async (req, res) => {
  const { title, description, tags, body } = req.body;

  try {
    // Calculate reading time
    const words = body.split(" ").length;
    const readingTime = Math.ceil(words / 200); // Approx. 200 words per minute

    // Create blog
    const newBlog = await Blog.create({
      title,
      description,
      tags,
      body,
      author: req.user.id, // Logged-in user's ID
      state: "draft", // Default state
      reading_time: readingTime,
    });

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Published Blogs
exports.getPublishedBlogs = async (req, res) => {
  const { search, order = "timestamp", page = 1, limit = 20 } = req.query;

  try {
    const query = { state: "published" };

    // Add search filters
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination and ordering
    const blogs = await Blog.find(query)
      .sort({ [order]: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ message: "Published blogs retrieved", blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Published Blog
exports.getSinglePublishedBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({ _id: id, state: "published" });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Increment read count
    blog.read_count += 1;
    await blog.save();

    res.status(200).json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User's Blogs
exports.getUserBlogs = async (req, res) => {
  const { state } = req.query;

  try {
    const query = { author: req.user.id };
    if (state) query.state = state; // Filter by state if provided

    const blogs = await Blog.find(query).sort({ timestamp: -1 });

    res.status(200).json({ message: "User blogs retrieved successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, body, state } = req.body;

  try {
    const blog = await Blog.findById(id);

    // Check if the blog exists and belongs to the user
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    // Update fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (tags) blog.tags = tags;
    if (body) {
      blog.body = body;
      const words = body.split(" ").length;
      blog.reading_time = Math.ceil(words / 200); // Recalculate reading time
    }
    if (state) blog.state = state;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    // Check if the blog exists and belongs to the user
    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};














// exports.createBlog = async (req, res) => {
//   try {
//     const blog = new Blog({ ...req.body, author: req.user.id });
//     blog.reading_time = calculateReadingTime(req.body.body);
//     await blog.save();
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getBlogs = async (req, res) => {
//   const { page = 1, limit = 20, search, sortBy, state } = req.query;
//   const query = { state: "published" };
  
//   if (search) {
//     query.$or = [
//       { title: new RegExp(search, "i") },
//       { tags: new RegExp(search, "i") },
//     ];
//   }

//   const sortOptions = {
//     read_count: "read_count",
//     reading_time: "reading_time",
//     timestamp: "timestamp",
//   };

//   const blogs = await Blog.find(query)
//     .populate("author", "first_name last_name email")
//     .sort({ [sortOptions[sortBy]]: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);

//   res.json(blogs);
// };
