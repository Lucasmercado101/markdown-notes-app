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

export const updateNote = (note: Note) => {
  return axios.put(`api/notes/${note._id}`, { note });
};

export const registerNewUser = (userData: {
  email: string;
  password: string;
}) => {
  return axios.post(`api/users/register`, userData);
};

export const login = (userData: { email: string; password: string }) => {
  return axios.post(`api/users/login`, userData);
};
