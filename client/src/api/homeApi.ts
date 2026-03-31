import axios from 'axios'
import { type Anime } from '../types/anime'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export type HomeContent = {
  anime: Anime[]
  films: Anime[]
  series: Anime[]
}

export async function getHomeContent(): Promise<HomeContent> {
  const response = await axios.get<HomeContent>(`${API_BASE_URL}/home`)
  return response.data
}
