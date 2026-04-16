import { Router } from "express";
import {
  getAllSeries,
  deleteSeries,
  updateSeries,
} from "../controllers/seriesController";
import upload from "../middleware/upload";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllSeries);
router.delete("/:id", requireAuth, deleteSeries);
router.put("/:id", requireAuth, upload.single("poster"), updateSeries);

export default router;
