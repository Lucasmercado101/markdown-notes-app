import { Note } from "./components/Note/types";
import axios, { AxiosPromise } from "axios";

//TODO: catch errors
export const getNotes = (): AxiosPromise<Note[]> => {
  return axios.get("/api/notes");
};

export const createNewNote = (): AxiosPromise<Note> => {
  return axios.post("api/notes");
};

export const deleteNote = (id: string): AxiosPromise<any> => {
  return axios.delete(`api/notes/${id}`);
};

export const updateNote = (note: Note): AxiosPromise<any> => {
  return axios.put(`api/notes/${note._id}`, { note });
};

export const registerNewUser = (userData: {
  email: string;
  password: string;
}): AxiosPromise<any> => {
  return axios.post(`api/users/register`, userData);
};

export const login = (userData: {
  email: string;
  password: string;
}): AxiosPromise<any> => {
  return axios.post(`api/users/login`, userData);
};
