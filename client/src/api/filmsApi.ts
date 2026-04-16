import http from "./http";
import { type Anime as Film } from "../types/anime";

export async function getAllFilms() {
  const response = await http.get<Film[]>("/films");
  return response.data;
}

export async function deleteFilm(id: number) {
  await http.delete(`/films/${id}`);
}

export async function updateFilm(id: number, formData: FormData) {
  const response = await http.put(`/films/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
