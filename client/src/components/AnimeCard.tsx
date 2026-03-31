import { type Anime } from '../types/anime'
import styles from './Card.module.css'

type AnimeCardProps = {
	anime: Anime
	onDelete?: (id: number) => void
	onEdit?: (anime: Anime) => void
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

export function AnimeCard({ anime, onDelete, onEdit }: AnimeCardProps) {
	const posterUrl = anime.poster_url ? `${import.meta.env.VITE_API_BASE_URL}${anime.poster_url}` : null;

	return (
		<article className={styles.card}>
			{posterUrl ? (
				<div className={styles.poster}>
					<img src={posterUrl} alt={`Poster for ${anime.title}`} className={styles.posterImage} />
				</div>
			) : (
				<div className={styles.poster} aria-hidden="true">
					<span className={styles.posterLetter}>{anime.title.charAt(0).toUpperCase()}</span>
				</div>
			)}

			<div className={styles.cardBody}>
				<div className={styles.titleRow}>
					<h2 className={styles.cardTitle}>{anime.title}</h2>
					<div className={styles.actionButtons}>
						<span className={styles.deleteButton} onClick={() => onDelete?.(anime.id)}>
							Видалити
						</span>
						<span className={styles.editButton} onClick={() => onEdit?.(anime)}>
							Редагувати
						</span>
					</div>
				</div>

				<div className={styles.metaRow}>
					<span className={styles.badge}>⭐ {formatRating(anime.rating)}</span>
					<span className={styles.badge}>{formatReleaseDate(anime.release_date)}</span>
				</div>

				<p className={styles.description}>{anime.description ?? 'Опис відсутній'}</p>
			</div>
		</article>
	)
}
