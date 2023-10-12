import express from "express";

// security
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

//Models
import { UserModel } from "../models/Users.js";

const router = express.Router();

// register route
router.post("/register", async(req, res) => {
  // request from the front-end
  const { username, password } = req.body;

  // Query
  try {
    const user = await UserModel.findOne({username: username});

    //check if the username exist
    if(user) {
      return res.json({
        message: "User already exist!"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a user account
    const newUser = new UserModel({
      username: username, 
      password: hashedPassword
    })
    await newUser.save();

    //send to front-end
    res.json({message: "User Account is Registered Succesfully!"});

    //catch error
  } catch (error) {
    res.json({ error: error})
  }
})

// login route
router.post("/login", async (req, res) => {
  // request from the front-end
  const { username, password } = req.body;

  // Query
  try {
    // Find the user 
    const user = await UserModel.findOne({username: username})

    // No user found
    if(!user){
      return res.json({message: "No Username found!"})
    }

    // check the password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // not valid password
    if(!isPasswordValid){
      return res.json({message: "Username or Password is incorrect!"})
    }

    // Token
    const token = jwt.sign({id: user._id}, "secret")
    res.json({ token: token, userID: user._id})

  // catch error
  } catch (error) {
    res.json({ error: error })
  }
})

export {router as userRouter}