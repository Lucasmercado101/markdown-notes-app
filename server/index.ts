import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";

import rootDir from "./utils/path";
import initPassport from "./passport config";
import Note from "./models/note";
import User from "./models/user";
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

//   if (req.user) {

app.get("/api/notes", (_, res) =>
  Note.find().then((i) =>
    res.json(
      i.map((i) => {
        return { _id: i._id, text: i.text, color: i.color };
      })
    )
  )
);

app.put("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndUpdate(noteID, req.body.note, () => res.sendStatus(200));
});

app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndDelete(noteID, (i) => res.sendStatus(200));
});

app.post("/api/notes", (_, res) => {
  const note = new Note({ text: "! New note", color: "#fff" });
  note.save().then(({ _id, text, color }) => res.json({ _id, text, color }));
});

//

app.post("/api/users/register", async (req, res) => {
  // TODO: Check if user already exists
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(404);
  }
});

app.post("/api/users/login", passport.authenticate("login"), (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
