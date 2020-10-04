import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface Note extends mongoose.Document {
  text: string;
  color: string;
}

var noteSchema = new Schema({
  text: String,
  color: String,
});

export default mongoose.model<Note>("note", noteSchema);
