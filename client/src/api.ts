import { Note } from "./components/Note/types";
import axios from "axios";

//TODO: catch errors

export const getNotes = (): Promise<Note[]> => {
  return axios.get("/api/notes").then((i) => i.data);
};

export const createNewNote = (): Promise<Note> => {
  return axios.post("api/notes").then((i) => i.data);
};

export const deleteNote = (id: string) => {
  return axios.delete(`api/notes/${id}`);
};
