import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "hello!" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
