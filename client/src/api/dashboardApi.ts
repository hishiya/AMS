import http from "../api/http";

export interface DashboardItem {
  title: string;
  description: string | null;
  release_date: string | null;
  rating: number | null;
  poster_url?: string | null;
}

export async function addFilm(item: FormData) {
  const response = await http.post("/dashboard/films", item, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function addSeries(item: FormData) {
  const response = await http.post("/dashboard/series", item, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function addAnime(item: FormData) {
  const response = await http.post("/dashboard/anime", item, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
