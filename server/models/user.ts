import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface User extends mongoose.Document {
  email: string;
  password: string;
  notes: [];
}

var userSchema = new Schema({
  email: String,
  password: String,
  notes: Array,
});

export default mongoose.model<User>("user", userSchema);
