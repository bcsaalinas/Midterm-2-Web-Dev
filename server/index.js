import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.resolve(__dirname, "../client");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(express.static(CLIENT_DIR));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }
  if (req.path.startsWith("/api") || req.path === "/health") {
    return next();
  }
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
