import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface DashboardItem {
    title: string
    description: string | null
    release_date: string | null
    rating: number | null
    poster_url?: string | null // Додаємо необов'язкове поле для URL постера
}

// Оновлюємо функції, щоб вони приймали FormData
export async function addFilm(item: FormData) {
    const response = await axios.post(`${API_BASE_URL}/dashboard/films`, item, {
        headers: {
            'Content-Type': 'multipart/form-data', // Вказуємо правильний заголовок
        },
    });
    return response.data
}

export async function addSeries(item: FormData) {
    const response = await axios.post(`${API_BASE_URL}/dashboard/series`, item, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data
}

export async function addAnime(item: FormData) {
    const response = await axios.post(`${API_BASE_URL}/dashboard/anime`, item, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data
}