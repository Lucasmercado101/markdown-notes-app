import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface Note extends mongoose.Document {
  text: string;
  color: string;
}

var noteSchema = new Schema({
  // Creator is the creators ID, do not send this
  //Instead get it thru JWT or something,
  // the person does not need to know their username,
  // just send it and compare it when fetching on the api
  creator: String,
  text: String,
  color: String,
});

export default mongoose.model<Note>("note", noteSchema);
