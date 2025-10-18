import "dotenv/config";

import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(cors()); // lets the browser communicate even if its on a different port
app.use(express.json());
app.use(routes);

//heatlh endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});
const PORT = process.env.PORT ?? 1000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
