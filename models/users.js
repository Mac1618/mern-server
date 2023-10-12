import mongoose from "mongoose";

// Users Schema
const UserSchema = new mongoose.Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
})

// export the UserModel so we can call this Model
export const UserModel = mongoose.model("users", UserSchema);