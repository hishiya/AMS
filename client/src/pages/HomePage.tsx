import { useEffect, useState } from 'react'
import { getHomeContent } from '../api/homeApi'
import { deleteAnime, updateAnime } from '../api/animeApi'
import { deleteFilm, updateFilm } from '../api/filmsApi'
import { deleteSeries, updateSeries } from '../api/seriesApi'
import { AnimeCard } from '../components/AnimeCard'
import { FilmCard } from '../components/FilmCard'
import { SeriesCard } from '../components/SeriesCard'
import { type Anime } from '../types/anime'
import styles from './HomePage.module.css'
import { EditModal } from '../components/EditModal'

export function HomePage() {
  const [content, setContent] = useState<{
    anime: Anime[]
    films: Anime[]
    series: Anime[]
  }>({ anime: [], films: [], series: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState<Anime | null>(null)
  const [selectedSeries, setSelectedSeries] = useState<Anime | null>(null)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getHomeContent()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    void fetchContent()
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount((count) => count + 1)
  }

  const handleEditAnime = (item: Anime) => {
    setSelectedAnime(item)
    setIsEditModalOpen(true)
  }

  const handleEditFilm = (item: Anime) => {
    setSelectedFilm(item)
    setIsEditModalOpen(true)
  }

  const handleEditSeries = (item: Anime) => {
    setSelectedSeries(item)
    setIsEditModalOpen(true)
  }

  const handleSubmitEdit = async (formData: FormData) => {
    const id = selectedAnime?.id || selectedFilm?.id || selectedSeries?.id
    if (!id) return

    try {
      if (selectedAnime) {
        await updateAnime(id, formData)
        setContent(prev => ({
          ...prev,
          anime: prev.anime.map(item => item.id === id ? { ...item, ...formData } as Anime : item)
        }))
      } else if (selectedFilm) {
        await updateFilm(id, formData)
        setContent(prev => ({
          ...prev,
          films: prev.films.map(item => item.id === id ? { ...item, ...formData } as Anime : item)
        }))
      } else if (selectedSeries) {
        await updateSeries(id, formData)
        setContent(prev => ({
          ...prev,
          series: prev.series.map(item => item.id === id ? { ...item, ...formData } as Anime : item)
        }))
      }
      setIsEditModalOpen(false)
      setSelectedAnime(null)
      setSelectedFilm(null)
      setSelectedSeries(null)
    } catch (err) {
      console.error('Failed to update item:', err)
    }
  }

  const handleDeleteAnime = async (id: number) => {
    try {
      await deleteAnime(id)
      setContent(prev => ({ ...prev, anime: prev.anime.filter(item => item.id !== id) }))
    } catch (err) { console.error('Error:', err) }
  }

  const handleDeleteFilm = async (id: number) => {
    try {
      await deleteFilm(id)
      setContent(prev => ({ ...prev, films: prev.films.filter(item => item.id !== id) }))
    } catch (err) { console.error('Error:', err) }
  }

  const handleDeleteSeries = async (id: number) => {
    try {
      await deleteSeries(id)
      setContent(prev => ({ ...prev, series: prev.series.filter(item => item.id !== id) }))
    } catch (err) { console.error('Error:', err) }
  }

  return (
  <>
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Головна</h1>
      <p className={styles.pageSubtitle}>
        Ласкаво просимо! Тут зібрані найкращі аніме, фільми та серіали які дивився hishiya.
      </p>

      {loading && <p className={styles.feedback}>Завантаження...</p>}

      {error && (
        <div className={`${styles.feedback} ${styles.error}`}>
          <p>{error.message || 'Не вдалося завантажити контент'}</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Спробувати ще
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {content.anime.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Аніме</h2>
              <ul className={styles.grid}>
                {content.anime.map((item) => (
                  <li key={`anime-${item.id}`} className={styles.listItem}>
                    <AnimeCard anime={item} onDelete={handleDeleteAnime} onEdit={handleEditAnime} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.films.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Фільми</h2>
              <ul className={styles.grid}>
                {content.films.map((item) => (
                  <li key={`film-${item.id}`} className={styles.listItem}>
                    <FilmCard film={item} onDelete={handleDeleteFilm} onEdit={handleEditFilm} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.series.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Серіали</h2>
              <ul className={styles.grid}>
                {content.series.map((item) => (
                  <li key={`series-${item.id}`} className={styles.listItem}>
                    <SeriesCard series={item} onDelete={handleDeleteSeries} onEdit={handleEditSeries} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>

    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => {
        setIsEditModalOpen(false)
        setSelectedAnime(null)
        setSelectedFilm(null)
        setSelectedSeries(null)
      }}
      onSubmit={handleSubmitEdit} 
      initialData={selectedAnime || selectedFilm || selectedSeries}
    />
  </>
  )
}