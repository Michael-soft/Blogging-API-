const request = require("supertest");
const app = require("../server.js"); // Your Express app
const User = require("../models/User.js"); // User model
const { connectDB, closeDB } = require("./utils/db.js"); // In-memory DB utils

describe("User Authentication", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  it("should sign up a new user", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "james",
        last_name: "Doi",
        email: "jamesgio@gmail.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Signup successful");
    const user = await User.findOne({ email: "jamesgio@gmail.com" });
    expect(user).toBeTruthy();
  });

  it("should fail signup with duplicate email", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "elizabeth",
        last_name: "Douglas",
        email: "jamesgio@gmail.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .send({
        email: "jamesgio@gmail.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .send({
        email: "jamesgio@gmail.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
