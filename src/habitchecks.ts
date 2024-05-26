import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { catchErrors } from "./errors";
import { number, z } from "zod";
import { ZodError } from "zod";
import { zodErrorMessage } from "./errors";

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
  catchErrors(async (req, res) => {
    const habitChecks = await db.habitCheck.findMany({});
    send(res).ok(habitChecks);
  })
);

// Get habit check by ID
router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);

    try {
      const habitCheck = await db.habitCheck.findUniqueOrThrow({
        where: { id },
      });

      // If habit check is null, it means it was not found
      if (!habitCheck) {
        return send(res).notFound();
      }

      // Respond with the habit check if found
      send(res).ok(habitCheck);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return send(res).badRequest(zodErrorMessage(error));
      }
      console.error(error);
      send(res).internalError("Internal error");
    }
  })
);


// Update habit check status
router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);
    const { status } = habitCheckBodySchema.parse(req.body);

    try {
      const updatedHabitCheck = await db.habitCheck.update({
        where: { id },
        data: { status },
      });

      send(res).ok(updatedHabitCheck); 
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return send(res).badRequest(zodErrorMessage(error));
      }
      console.error(error);
      send(res).internalError("Internal error");
    }
  })
);


// Delete a habit check by ID
router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id } = idParamsSchema.parse(req.params);

    try {
      await db.habitCheck.delete({ where: { id } });
      send(res).ok({});
    } catch (error: unknown) {
      console.error(error);
      send(res).internalError("Internal error");
    }
  })
);

export default router;
