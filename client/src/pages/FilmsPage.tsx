import { useEffect, useState } from "react";

import { deleteFilm, getAllFilms, updateFilm } from "../api/filmsApi";
import { FilmCard } from "../components/FilmCard";
import { EditModal } from "../components/EditModal";
import { type Anime as Film } from "../types/anime";
import styles from "./FilmsPage.module.css";

type FilmsPageProps = {
  isAuthenticated: boolean;
};

export function FilmsPage({ isAuthenticated }: FilmsPageProps) {
  const [filmList, setFilmList] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllFilms();
        setFilmList(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchFilms();
  }, [retryCount]);

  const handleDelete = async (id: number) => {
    try {
      await deleteFilm(id);
      setFilmList((films) => films.filter((film) => film.id !== id));
    } catch (err) {
      console.error("Failed to delete film:", err);
    }
  };

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  const handleEdit = (film: Film) => {
    setSelectedFilm(film);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (formData: FormData) => {
    if (!selectedFilm) return;

    await updateFilm(selectedFilm.id, formData)
      .then((updatedFilm) => {
        setFilmList((list) =>
          list.map((item) => (item.id === updatedFilm.id ? updatedFilm : item)),
        );
        setIsEditModalOpen(false);
        setSelectedFilm(null);
      })
      .catch((err) => {
        console.error("Failed to update film:", err);
      });
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Films</h1>
      <p className={styles.subtitle}>
        Колекція фільмів з рейтингом, датою релізу та коротким описом.
      </p>

      {loading && <p className={styles.feedback}>Завантаження...</p>}

      {error && (
        <p className={`${styles.feedback} ${styles.error}`}>
          {error.message || "Не вдалося завантажити фільми"}
          <button onClick={handleRetry} className={styles.retryButton}>
            Спробувати ще
          </button>
        </p>
      )}

      {!loading && !error && filmList.length === 0 && (
        <p className={styles.feedback}>Немає фільмів для відображення.</p>
      )}

      {!loading && !error && (
        <ul className={styles.grid}>
          {filmList.map((film) => (
            <li key={film.id}>
              <FilmCard
                film={film}
                onDelete={isAuthenticated ? handleDelete : undefined}
                onEdit={isAuthenticated ? handleEdit : undefined}
              />
            </li>
          ))}
        </ul>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFilm(null);
        }}
        onSubmit={handleSubmitEdit}
        initialData={selectedFilm}
      />
    </section>
  );
}
