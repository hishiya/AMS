import { useEffect, useState } from "react";
import { getAllSeries, deleteSeries, updateSeries } from "../api/seriesApi";
import { SeriesCard } from "../components/SeriesCard";
import { type Anime as Series } from "../types/anime";
import styles from "./SeriesPage.module.css";
import { EditModal } from "../components/EditModal";

type SeriesPageProps = {
  isAuthenticated: boolean;
};

export function SeriesPage({ isAuthenticated }: SeriesPageProps) {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllSeries();
        setSeriesList(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchSeries();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSeries(id);
      setSeriesList((list) => list.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete series:", err);
    }
  };

  const handleEdit = (series: Series) => {
    setSelectedSeries(series);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (formData: FormData) => {
    if (!selectedSeries) return;

    await updateSeries(selectedSeries.id, formData)
      .then((updatedSeries) => {
        setSeriesList((list) =>
          list.map((item) =>
            item.id === updatedSeries.id ? updatedSeries : item,
          ),
        );
        setIsEditModalOpen(false);
        setSelectedSeries(null);
      })
      .catch((err) => {
        console.error("Failed to update series:", err);
      });
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Series</h1>
      <p className={styles.subtitle}>
        Колекція серіалів з рейтингом, датою релізу та коротким описом.
      </p>

      {loading && <p className={styles.feedback}>Завантаження...</p>}

      {error && (
        <p className={`${styles.feedback} ${styles.error}`}>
          {error.message || "Не вдалося завантажити серіали"}
          <button onClick={handleRetry} className={styles.retryButton}>
            Спробувати ще
          </button>
        </p>
      )}

      {!loading && !error && seriesList.length === 0 && (
        <p className={styles.feedback}>Немає серіалів для відображення.</p>
      )}

      {!loading && !error && (
        <ul className={styles.grid}>
          {seriesList.map((series) => (
            <li key={series.id} className={styles.listItem}>
              <SeriesCard
                series={series}
                onDelete={isAuthenticated ? handleDelete : undefined}
                onEdit={isAuthenticated ? handleEdit : undefined}
              />
            </li>
          ))}
        </ul>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        initialData={selectedSeries}
      />
    </section>
  );
}
