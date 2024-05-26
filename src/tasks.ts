import { Router } from "express";
import { db } from "./db";
import { z } from "zod";
import { catchErrors } from "./errors";
import { send } from "./response";
import { defaultErrorHandler } from "./errors";

const router = Router();

const taskBodySchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(1000),
  status: z.string().optional(),
  userId: z.coerce.number(),
});

//Get all tasks
router.get(
  "/",
  catchErrors(async (_, res) => {
    const tasks = await db.task.findMany({});
    send(res).ok(tasks);
  })
);

//Get tasks by id
router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task) {
      send(res).notFound();
      return;
    }
    send(res).ok(task);
  })
);

//Create task
router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = taskBodySchema.parse(req.body);
    const task = await db.task.create({ data });
    send(res).createdOk(task);
  })
);

//Delete task
router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const taskId = parseInt(req.params.id);
    await db.task.delete({ where: { id: taskId } });
  })
);

router.use(defaultErrorHandler);

export default router;
