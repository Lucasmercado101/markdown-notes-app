import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import "dotenv/config";
import rootDir from "./utils/path";

import Note from "./models/note";

const port = process.env.PRODUCTION || 5000;
const app = express();

mongoose
  .connect(process.env.MONGO_DB_PASS!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Mongo"))
  .catch(() => console.log("FAILED TO CONNECT TO MONGO"));

app.use(cors());
app.use(json());
app.use(express.static(path.join(rootDir, "..", "client", "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(rootDir, "..", "client", "build", "index.html"));
// });

app.get("/api/notes", (_, res) =>
  Note.find().then((i) =>
    res.json(
      i.map((i) => {
        return { _id: i._id, text: i.text, color: i.color };
      })
    )
  )
);

app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndDelete(noteID, (i) => res.sendStatus(200));
});

app.post("/api/notes", (_, res) => {
  const note = new Note({ text: "! New note", color: "#fff" });
  note.save().then(({ _id, text, color }) => res.json({ _id, text, color }));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
