import axios from 'axios'
import { type Anime as Series } from '../types/anime'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllSeries() {
  const response = await axios.get<Series[]>(`${API_BASE_URL}/series`)
  return response.data
}

export async function deleteSeries(id: number) {
  await axios.delete(`${API_BASE_URL}/series/${id}`)
}

export async function updateSeries(id: number, formData: FormData) {
  const response = await axios.put(`${API_BASE_URL}/series/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
