import http from "./http";
import { type Anime } from "../types/anime";

export async function getAllAnime() {
  const response = await http.get<Anime[]>("/anime");
  return response.data;
}

export async function deleteAnime(id: number) {
  await http.delete(`/anime/${id}`);
}

export async function updateAnime(id: number, formData: FormData) {
  const response = await http.put(`/anime/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
