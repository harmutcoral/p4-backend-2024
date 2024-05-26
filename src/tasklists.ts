import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export const tasklists = Router();

tasklists.get("/", async (req, res) => {
  try {
    const result = await db.task.findMany({});
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});
