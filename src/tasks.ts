import { Router } from "express";
import { db } from "./db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await db.task.findMany({});
    res.status(200).json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

export default router;
