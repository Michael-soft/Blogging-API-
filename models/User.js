const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt`
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


// const userSchema = new mongoose.Schema({
//     first_name: {type: String, required: true},
//     last_name: {type: String, required: true},
//     email: {type: String, unique: true, required: true},
//     password: {type: String, required: true},

// });

// userSchema.pre("save",async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password,10);

//     }
//     next();

// });

// module.exports = mongoose.model("User", userSchema);