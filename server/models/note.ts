import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface Note extends mongoose.Document {
  creator: String;
  text: string;
  color: string;
}

var noteSchema = new Schema({
  creator: String,
  text: String,
  color: String,
});

export default mongoose.model<Note>("note", noteSchema);
