import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import "dotenv/config";
import rootDir from "./utils/path";

const port = process.env.PRODUCTION || 5000;
const app = express();

mongoose.connect(process.env.MONGO_DB_PASS!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(rootDir);

app.use(cors());
app.use(express.static(path.join(rootDir, "..", "client", "build")));

app.use(json());
app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "..", "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port port!`));
