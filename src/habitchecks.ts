import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { catchErrors } from "./errors";
import { z } from "zod";
import { defaultErrorHandler } from "./errors";

const router = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });

const habitCheckBodySchema = z.object({
  habit: z.string().min(3).max(50),
  status: z.string().max(50),
  userId: z.coerce.number(),
});

// Get all habit checks
router.get(
  "/",
  catchErrors(async (_, res) => {
    const habitChecks = await db.habitCheck.findMany({});
    send(res).ok(habitChecks);
  })
);

// Get habit check by ID
router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);

    const habitCheck = await db.habitCheck.findUnique({ where: { id } });

    if (!habitCheck) {
      return send(res).notFound();
    }

    send(res).ok(habitCheck);
  })
);

// Update habit check status
router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);
    const { status } = habitCheckBodySchema.parse(req.body);

    const updatedHabitCheck = await db.habitCheck.update({
      where: { id },
      data: { status },
    });

    send(res).ok(updatedHabitCheck); 
  })
);

// Delete a habit check by ID
router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);
    const deletedHabitCheck = await db.habitCheck.delete({ where: { id } });

    if (!deletedHabitCheck) {
      return send(res).notFound();
    }
    send(res).ok({ message: `Habit check with ID ${id} deleted successfully` });
  })
);

router.use(defaultErrorHandler);

export default router;
