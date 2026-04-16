import { Router } from "express";
import {
  deleteFilm,
  getAllFilms,
  updateFilm,
} from "../controllers/filmsController";
import upload from "../middleware/upload";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllFilms);
router.delete("/:id", requireAuth, deleteFilm);
router.put("/:id", requireAuth, upload.single("poster"), updateFilm);

export default router;
