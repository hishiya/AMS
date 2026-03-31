import { type Anime, type Anime as Film } from '../types/anime'
import styles from './Card.module.css'

type FilmCardProps = {
	film: Film
	onDelete?: (id: number) => void
	onEdit?: (film: Film) => void

}

function formatReleaseDate(value: string | null) {
	if (!value) {
		return 'Дата невідома'
	}

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return 'Дата невідома'
	}

	return date.toLocaleDateString('uk-UA', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

function formatRating(value: number | null) {
	if (value === null) {
		return 'N/A'
	}

	return value.toFixed(1)
}

export function FilmCard({ film, onDelete, onEdit }: FilmCardProps) {

	const posterUrl = film.poster_url ? `${import.meta.env.VITE_API_BASE_URL}${film.poster_url}` : null;

	return (
		<article className={styles.card}>
			{posterUrl ? (
				<div className={styles.poster}>
					<img src={posterUrl} alt={`Poster for ${film.title}`} className={styles.posterImage} />
				</div>
			) : (
				<div className={styles.poster} aria-hidden="true">
					<span className={styles.posterLetter}>{film.title.charAt(0).toUpperCase()}</span>
				</div>
			)}

			<div className={styles.cardBody}>
				<div className={styles.titleRow}>
					<h2 className={styles.cardTitle}>{film.title}</h2>
					<div className={styles.actionButtons}>
						<span className={styles.deleteButton} onClick={() => onDelete?.(film.id)}>
							Видалити
						</span>
						<span className={styles.editButton} onClick={() => onEdit?.(film)}>
							Редагувати
						</span>
					</div>
				</div>

				<div className={styles.metaRow}>
					<span className={styles.badge}>⭐ {formatRating(film.rating)}</span>
					<span className={styles.badge}>{formatReleaseDate(film.release_date)}</span>
				</div>

				<p className={styles.description}>{film.description ?? 'Опис відсутній'}</p>
			</div>
		</article>
	)
}
