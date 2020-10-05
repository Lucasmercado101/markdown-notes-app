import { Router } from "express";
import Note from "../models/note";

const router = Router();

router.use("/", ({ isAuthenticated }, res, next) => {
  if (isAuthenticated()) return next();
  else return res.sendStatus(409);
});

router.get("/notes", (_, res) =>
  Note.find().then((i) =>
    res.json(
      i.map((i) => {
        return { _id: i._id, text: i.text, color: i.color };
      })
    )
  )
);

router.put("/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndUpdate(noteID, req.body.note, () => res.sendStatus(200));
});

router.delete("/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndDelete(noteID, (i) => res.sendStatus(200));
});

router.post("/notes", (_, res) => {
  const note = new Note({ text: "! New note", color: "#fff" });
  note.save().then(({ _id, text, color }) => res.json({ _id, text, color }));
});

export default router;
