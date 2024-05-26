import { Router } from "express";
import { db } from "./db";

const router = Router();

/*
GET     /tasks/             Get all tasks
GET     /tasks/:id          Get one task (enter task id)
POST    /tasks/             Add one task
DELETE  /tasks/:id          Delete one task (enter task id)
*/

router.get("/", async (req, res) => {
  try {
    const tasks = await db.task.findMany({});
    res.status(200).json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await db.task.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(task);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return res.status(404).json({ message: "Task not found. :(" });
    }
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, status, userId } = req.body;
    const task = await db.task.create({
      data: { title, content, status, userId },
    });
    res.status(201).json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Couldn't create task." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Couldn't delete task." });
  }
});

export default router;
