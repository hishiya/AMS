import axios from 'axios'
import { type Anime } from '../types/anime'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllAnime() {
  const response = await axios.get<Anime[]>(`${API_BASE_URL}/anime`)
  return response.data
}

export async function deleteAnime(id: number) {
  await axios.delete(`${API_BASE_URL}/anime/${id}`)
}

export async function updateAnime(id: number, formData: FormData) {
  const response = await axios.put(`${API_BASE_URL}/anime/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}