import axios from 'axios'
import { type Anime as Film } from '../types/anime'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllFilms() {
  const response = await axios.get<Film[]>(`${API_BASE_URL}/films`)
  return response.data
}

export async function deleteFilm(id: number) {
  await axios.delete(`${API_BASE_URL}/films/${id}`)
}

export async function updateFilm(id: number, formData: FormData) {
  const response = await axios.put(`${API_BASE_URL}/films/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
