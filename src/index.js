import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import Router
import { userRouter } from "../routes/users.js";

const app = express();

// Middlewares
  // Convert the data from the front-end to json
  app.use(express.json());
  // Solves the issues when trying to connect in api request
  app.use(cors());


  //Routes
    // users
  app.use("/auth", userRouter)

  // Connext to mongoDB Atlast
  mongoose.connect(
    "mongodb+srv://MernRecipe_App123:RJ1pTdPPM1Z9SMhY@mernrecipecluster.xjves63.mongodb.net/mernrecipedb?retryWrites=true&w=majority",   
    {
      useNewUrlParser: true,
    }
  );

  // Run the server
  app.listen(3001,() => {
    console.log("Server is running on port: 3001")
  })