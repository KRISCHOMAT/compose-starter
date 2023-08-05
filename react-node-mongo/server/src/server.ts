import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  getKittens,
  addKitten,
  greeting,
  deleteKitten,
} from "./controllers/controllers";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

app.get("/", getKittens);
app.post("/", addKitten);
app.post("/greeting", greeting);
app.post("/delete", deleteKitten);

const startServer = async () => {
  try {
    const MONGODB_URI = "mongodb://mongo:27017/my-db?authSource=admin";
    await mongoose.connect(MONGODB_URI, {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    });
    app.listen(PORT, () => {
      console.log("listening on port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
