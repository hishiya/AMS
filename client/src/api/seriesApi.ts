import http from "./http";
import { type Anime as Series } from "../types/anime";

export async function getAllSeries() {
  const response = await http.get<Series[]>("/series");
  return response.data;
}

export async function deleteSeries(id: number) {
  await http.delete(`/series/${id}`);
}

export async function updateSeries(id: number, formData: FormData) {
  const response = await http.put(`/series/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
