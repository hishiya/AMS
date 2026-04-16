import React, { useState } from "react";
import {
  addFilm,
  addSeries,
  addAnime,
  type DashboardItem,
} from "../api/dashboardApi";
import styles from "./DashboardAddItem.module.css";

const DashboardAddItem: React.FC = () => {
  const [itemType, setItemType] = useState<"film" | "series" | "anime">("film");
  const [item, setItem] = useState<DashboardItem>({
    title: "",
    description: null,
    release_date: null,
    rating: null,
  });

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]:
        value === "" ? null : name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosterFile(e.target.files[0]);
    } else {
      setPosterFile(null);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemType(e.target.value as "film" | "series" | "anime");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", item.title);
    if (item.description) formData.append("description", item.description);
    if (item.release_date) formData.append("release_date", item.release_date);
    if (item.rating !== null) formData.append("rating", item.rating.toString());

    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      if (itemType === "film") {
        await addFilm(formData);
      } else if (itemType === "series") {
        await addSeries(formData);
      } else {
        await addAnime(formData);
      }
      setMessage(`Successfully added ${itemType}: ${item.title}`);
      setItem({
        title: "",
        description: null,
        release_date: null,
        rating: null,
      });
      setPosterFile(null);
    } catch (error) {
      setMessage(`Error adding ${itemType}.`);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Item</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <select
          value={itemType}
          onChange={handleTypeChange}
          className={styles.select}
        >
          <option value="film">Film</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
        </select>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className={styles.input}
        />
        <label className={styles.label}>Poster Image (optional)</label>
        <input
          type="file"
          name="poster"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className={styles.input}
        />
        <textarea
          name="description"
          value={item.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textarea}
        />
        <input
          type="date"
          name="release_date"
          value={item.release_date || ""}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="rating"
          value={item.rating || ""}
          onChange={handleChange}
          placeholder="Rating"
          step="0.1"
          min="0"
          max="10"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default DashboardAddItem;
