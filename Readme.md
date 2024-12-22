# Blogging API

The Blogging API is a robust backend service built using Node.js and Express that allows users to create, read, update, and delete blogs. It includes features like authentication, authorization, pagination, filtering, and sorting.

## Features

- User authentication using JWT (JSON Web Tokens).
- Create, update, delete, and retrieve blogs.
- Blogs can be in two states: `draft` or `published`.
- Users can only manage their blogs (update or delete).
- Publicly accessible endpoints for viewing published blogs.
- Pagination, filtering, and sorting for blogs.
- Secure password storage using bcrypt.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest
- **Environment Variables**: dotenv

## Prerequisites

- [Node.js](https://nodejs.org/) installed (version 14+ recommended)
- [MongoDB](https://www.mongodb.com/) installed locally or use a cloud instance

## Installation

1. Clone the repository:
   ```bash
   git clone  https://github.com/Michael-soft/Blogging-API-.git
   cd blogging-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```bash
   npm run server
   ```

5. The server will start at `http://localhost:5000`.

## API Endpoints

### **Authentication**

#### 1. Sign Up
- **POST** `/api/auth/signup`
- **Body**:
  ```json
  {
    "first_name": "funke",
    "last_name": "deyi",
    "email": "funkee@gmail.com",
    "password": "password123"
  }
  ```

#### 2. Sign In
- **POST** `/api/auth/signin`
- **Body**:
  ```json
  {
    "email": "funkee@gmail.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "<jwt_token>"
  }
  ```

### **Blogs**

#### 1. Get Published Blogs
- **GET** `/api/blogs?page=1&limit=10&sort=read_count&order=desc`
- **Publicly accessible**

#### 2. Get Single Blog
- **GET** `/api/blogs/:id`
- **Publicly accessible**

#### 3. Create a Blog
- **POST** `/api/blogs`
- **Headers**:
  - Authorization: `Bearer <token>`
- **Body**:
  ```json
  {
    "title": "My First Blog",
    "description": "A brief description of my blog",
    "tags": ["coding", "javascript"],
    "body": "This is the main content of the blog."
  }
  ```

#### 4. Update a Blog
- **PUT** `/api/blogs/:id`
- **Headers**:
  - Authorization: `Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "description": "Updated description",
    "state": "published"
  }
  ```

#### 5. Delete a Blog
- **DELETE** `/api/blogs/:id`
- **Headers**:
  - Authorization: `Bearer <token>`

#### 6. Get User's Blogs
- **GET** `/api/blogs/myBlogs`
- **Headers**:
  - Authorization: `Bearer <token>`

### **Filtering, Pagination, and Sorting**
- **Pagination**: Use `page` and `limit` query parameters.
- **Filtering**: Use `state` query parameter (e.g., `?state=draft`).
- **Sorting**: Use `sort` and `order` query parameters (e.g., `?sort=read_count&order=asc`).

## Testing

Run tests using Jest and Supertest:
```bash
npm run test
```

## Project Structure

```
.
├── config
│   └── db.js            # MongoDB connection
├── controllers
│   ├── authController.js
│   └── blogController.js
├── middlewares
│   └── authMiddleware.js
├── models
│   ├── Blog.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   └── blogRoutes.js
├── tests
│   ├── auth.test.js
│   └── blog.test.js
├── server.js
└── .env.example         # Environment variable example
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.






