import React, { useState, useEffect } from 'react';
import { type Anime } from '../types/anime';
import styles from './EditModal.module.css'; 

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData: Anime | null; 
  title?: string; 
}

export function EditModal({ isOpen, onClose, onSubmit, initialData, title = "Редагувати" }: EditModalProps) {
    const [item, setItem] = useState({
        title: '',
        description: '',
        release_date: '',
        rating: '', 
    });

    const [posterFile, setPosterFile] = useState<File | null>(null);

    useEffect(() => {
        if (isOpen && initialData) {
            setItem({
                title: initialData.title || '',
                description: initialData.description || '',
                release_date: initialData.release_date ? initialData.release_date.split('T')[0] : '', 
                rating: initialData.rating !== null ? initialData.rating.toString() : '',
            });
            setPosterFile(null);
        }
    }, [isOpen, initialData]); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPosterFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', item.title);
        
        if (item.description) formData.append('description', item.description);
        if (item.release_date) formData.append('release_date', item.release_date);
        
        if (item.rating) formData.append('rating', parseFloat(item.rating).toString());
        
        if (posterFile) {
            formData.append('poster', posterFile);
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{title}</h2>

                <form onSubmit={handleSubmit} className={styles.formElement}>
                    <input
                        type="text"
                        name="title"
                        value={item.title}
                        onChange={handleChange}
                        placeholder="Назва"
                        required 
                        className={styles.input}
                    />
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        placeholder="Опис"
                        className={styles.textarea}
                    />
                    <input
                        type="date"
                        name="release_date"
                        value={item.release_date}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        name="rating"
                        value={item.rating}
                        onChange={handleChange}
                        step="0.1" 
                        min="0"
                        max="10"
                        placeholder="Рейтинг (від 0 до 10)"
                        className={styles.input}
                    />
                    <div className={styles.fileInputContainer}>
                        <label>Новий постер (необов'язково):</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                        />
                    </div>
                    
                    <div className={styles.buttons}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Скасувати
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}