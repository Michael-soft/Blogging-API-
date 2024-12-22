const Blog = require("../models/Blog.js");
const User = require("../models/User.js");
const request = require("supertest");
const app = require("../server.js");
const { connectDB, closeDB } = require("./utils/db.js");

describe("Blog Management", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await connectDB();

    // Create and authenticate a user
    const user = await User.create({
      first_name: "Author",
      last_name: "User",
      email: "author@gmail.com",
      password: "password123",
    });

    userId = user._id;

    const res = await request(app)
      .post("/auth/signin")
      .send({
        email: "author@gmail.com",
        password: "password123",
      });

    token = res.body.token;
  });

  afterAll(async () => {
    await closeDB();
  });

  it("should create a blog in draft state", async () => {
    const res = await request(app)
      .post("/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Blog",
        description: "This is a test blog",
        tags: ["test", "blog"],
        body: "This is the blog content",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.blog.state).toBe("draft");
  });

  it("should retrieve published blogs", async () => {
    const res = await request(app).get("/blogs").query({ page: 1, limit: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.blogs).toBeInstanceOf(Array);
  });

  it("should update blog state to published", async () => {
    const blog = await Blog.create({
      title: "Draft Blog",
      description: "This is a draft",
      author: userId,
      body: "Draft content",
      state: "draft",
    });

    const res = await request(app)
      .patch(`/blogs/${blog._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ state: "published" });

    expect(res.statusCode).toBe(200);
    expect(res.body.blog.state).toBe("published");
  });

  it("should delete a blog", async () => {
    const blog = await Blog.create({
      title: "Delete Blog",
      description: "This blog will be deleted",
      author: userId,
      body: "Delete content",
    });

    const res = await request(app)
      .delete(`/blogs/${blog._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    const deletedBlog = await Blog.findById(blog._id);
    expect(deletedBlog).toBeNull();
  });
});
