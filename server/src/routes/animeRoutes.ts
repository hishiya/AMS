import { Router } from "express";
import {
  getAllAnime,
  deleteAnime,
  updateAnime,
} from "../controllers/animeController";
import upload from "../middleware/upload";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllAnime);
router.delete("/:id", requireAuth, deleteAnime);
router.put("/:id", requireAuth, upload.single("poster"), updateAnime);

export default router;
