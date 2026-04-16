import http from "./http";
import { type Anime } from "../types/anime";

export type HomeContent = {
  anime: Anime[];
  films: Anime[];
  series: Anime[];
};

export async function getHomeContent(): Promise<HomeContent> {
  const response = await http.get<HomeContent>("/home");
  return response.data;
}
