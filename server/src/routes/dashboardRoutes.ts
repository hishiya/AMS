import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  addFilm,
  addSeries,
  addAnime,
} from "../controllers/dashboardController";
import upload from "../middleware/upload";

const router = Router();

router.post("/films", requireAuth, upload.single("poster"), addFilm);

router.post("/series", requireAuth, upload.single("poster"), addSeries);

router.post("/anime", requireAuth, upload.single("poster"), addAnime);

export default router;
