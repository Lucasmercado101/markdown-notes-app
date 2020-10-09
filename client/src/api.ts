import { Note } from "./components/Note/types";
import axios from "axios";

export const getNotes = () => {
  return axios.get("/api/notes");
};

export const createNewNote = () => {
  return axios.post("api/notes");
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

export const loginWithGoogle = (tokenID: string) => {
  return axios.post(`api/users/login/google`, { tokenID });
};

export const logOut = () => axios.post("api/users/logout");
