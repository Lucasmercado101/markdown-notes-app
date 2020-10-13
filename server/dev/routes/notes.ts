import { Router } from "express";
import Note from "../models/note";

const router = Router();

router.use("/", (req, res, next) => {
  if (req.user != undefined) return next();
  else return res.sendStatus(409);
});

router.get("/notes", ({ user }: any, res) => {
  Note.find(
    {
      _id: { $in: user.notes },
    },
    function (err, notes) {
      if (err) return res.sendStatus(500);
      res.json(
        notes.map((i) => {
          return { _id: i._id, text: i.text, color: i.color };
        })
      );
    }
  );
});

router.put("/notes/:id", (req, res) => {
  const noteID = req.params.id;
  Note.findByIdAndUpdate(noteID, req.body.note, () => res.sendStatus(200));
});

router.delete("/notes/:id", async (req: any, res) => {
  const noteID = req.params.id;
  try {
    await req.user.update({ $pull: { notes: { $in: [noteID] } } });
    await Note.findByIdAndDelete(noteID).catch(() => {});
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/notes", ({ user }: any, res) => {
  const note = new Note({ text: "! New note", color: "#fff" });
  user.notes.push(note.id);
  user.save();

  note.save().then(({ _id, text, color }) => res.json({ _id, text, color }));
});

export default router;
