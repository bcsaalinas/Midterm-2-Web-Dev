import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // lets the browser communicate even if its on a different port
app.use(express.json()); // so future post requests can send JSON properly

//heatlh endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT ?? 1000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
