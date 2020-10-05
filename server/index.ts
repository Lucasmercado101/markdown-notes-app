import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";

import userRoutes from "./routes/users";
import notesRoutes from "./routes/notes";

import rootDir from "./utils/path";
import initPassport from "./passport config";
// Dev requirement
import "dotenv/config";

const port = process.env.PRODUCTION || 5000;
const app = express();

initPassport(passport);

mongoose
  .connect(process.env.MONGO_DB_PASS!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Mongo"))
  .catch(() => console.log("FAILED TO CONNECT TO MONGO"));

app.use(express.static(path.join(rootDir, "..", "client", "build")));
app.use(cors());
app.use(json());
//TODO: replace session memoryStore with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("*", (req, res) => {
//   res.sendFile(path.join(rootDir, "..", "client", "build", "index.html"));
// });

app.use("/api", userRoutes);
app.use("/api", notesRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
