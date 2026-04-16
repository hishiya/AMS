import { type Anime as Series } from "../types/anime";
import styles from "./Card.module.css";

type SeriesCardProps = {
  series: Series;
  onDelete?: (id: number) => void;
  onEdit?: (series: Series) => void;
};

function formatReleaseDate(value: string | null) {
  if (!value) {
    return "Дата невідома";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Дата невідома";
  }

  return date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatRating(value: number | string | null) {
  if (value === null) {
    return "N/A";
  }

  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numericValue)) {
    return "N/A";
  }

  return numericValue.toFixed(1);
}

export function SeriesCard({ series, onDelete, onEdit }: SeriesCardProps) {
  const posterUrl = series.poster_url
    ? `${import.meta.env.VITE_API_BASE_URL}${series.poster_url}`
    : null;

  return (
    <article className={styles.card}>
      {posterUrl ? (
        <div className={styles.poster}>
          <img
            src={posterUrl}
            alt={`Poster for ${series.title}`}
            className={styles.posterImage}
          />
        </div>
      ) : (
        <div className={styles.poster} aria-hidden="true">
          <span className={styles.posterLetter}>
            {series.title.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className={styles.cardBody}>
        <div className={styles.titleRow}>
          <h2 className={styles.cardTitle}>{series.title}</h2>
          {(onDelete || onEdit) && (
            <div className={styles.actionButtons}>
              {onDelete && (
                <span
                  className={styles.deleteButton}
                  onClick={() => onDelete(series.id)}
                >
                  Видалити
                </span>
              )}
              {onEdit && (
                <span
                  className={styles.editButton}
                  onClick={() => onEdit(series)}
                >
                  Редагувати
                </span>
              )}
            </div>
          )}
        </div>

        <div className={styles.metaRow}>
          <span className={styles.badge}>⭐ {formatRating(series.rating)}</span>
          <span className={styles.badge}>
            {formatReleaseDate(series.release_date)}
          </span>
        </div>

        <p className={styles.description}>
          {series.description ?? "Опис відсутній"}
        </p>
      </div>
    </article>
  );
}
