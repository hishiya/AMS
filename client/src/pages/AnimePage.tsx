import { useEffect, useState } from 'react'
import { type Anime } from '../types/anime'
import { getAllAnime, deleteAnime, updateAnime } from '../api/animeApi'
import { AnimeCard } from '../components/AnimeCard'
import styles from './AnimePage.module.css'
import { EditModal } from '../components/EditModal'

export function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getAllAnime()
        setAnimeList(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    void fetchAnime()
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount(count => count + 1)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAnime(id)
      setAnimeList((list) => list.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Failed to delete anime:', err)
    }
  }

  const handleEdit = (anime: Anime) => {
    setSelectedAnime(anime)
    setIsEditModalOpen(true)
  }

  const handleSubmitEdit = async (formData: FormData) => {
    if (!selectedAnime) return

    await updateAnime(selectedAnime.id, formData)
      .then((updatedAnime) => {
        setAnimeList((list) =>
          list.map((item) => (item.id === updatedAnime.id ? updatedAnime : item))
        )
        setIsEditModalOpen(false)
        setSelectedAnime(null)
      })
      .catch((err) => {
        console.error('Failed to update anime:', err)
      })
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Anime</h1>
      <p className={styles.subtitle}>Колекція аніме з рейтингом, датою релізу та коротким описом.</p>

      {loading && <p className={styles.feedback}>Завантаження...</p>}

      {error && (
        <p className={`${styles.feedback} ${styles.error}`}>
          {error.message || 'Не вдалося завантажити аніме'}
          <button onClick={handleRetry} className={styles.retryButton}>Спробувати ще</button>
        </p>
      )}

      {!loading && !error && animeList.length === 0 && (
        <p className={styles.feedback}>Немає аніме для відображення.</p>
      )}

      {!loading && !error && (
        <ul className={styles.grid}>
          {animeList.map((anime) => (
            <li key={anime.id} className={styles.listItem}>
              <AnimeCard anime={anime} onDelete={handleDelete} onEdit={handleEdit} />
            </li>
          ))}
        </ul>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        initialData={selectedAnime}
      />
    </section>
  )
}
