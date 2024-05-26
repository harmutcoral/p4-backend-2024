import express from "express";
import cors from "cors";
import morgan from "morgan";
import tasksRouter from "./tasks";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/tasklists", tasksRouter);

app.get("/", async (req, res) => {
  res.json({ message: "hello!" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
