import { Router } from "express";
import { db } from "./db";

const router = Router();

/*
GET     /habitchecks/             Get all habit checks
GET     /habitchecks/:id          Get one habit check by ID
POST    /habitchecks/             Add a new habit check
DELETE  /habitchecks/:id          Delete a habit check by ID
*/

// Get all habit checks
router.get("/", async (req, res) => {
  try {
    const habitChecks = await db.habitCheck.findMany({});
    res.status(200).json(habitChecks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
});

// Get habit check by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const habitCheck = await db.habitCheck.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(habitCheck);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return res.status(404).json({ message: "Habit check not found." });
    }
    res.status(500).json({ error: "Internal error" });
  }
});

// Update habit check status
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedHabitCheck = await db.habitCheck.update({
        where: { id: Number(id) },
        data: { status },
      });
      res.status(200).json(updatedHabitCheck);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Couldn't update habit check status." });
    }
  });  

// Add a new habit check
router.post("/", async (req, res) => {
  try {
    const { habit, checkDate, status, userId } = req.body;
    const habitCheck = await db.habitCheck.create({
      data: { habit, checkDate, status, userId },
    });
    res.status(201).json(habitCheck);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Couldn't create habit check." });
  }
});

// Delete a habit check by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.habitCheck.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Couldn't delete habit check." });
  }
});

export default router;
