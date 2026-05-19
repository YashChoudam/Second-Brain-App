// Import for packages
import express from "express";
import dotenv from "dotenv";

// Import for routes
import { userRoutes } from "./routes/user.routes.js";

// Import for internal files
import { connectDB } from "./database/db.js";

dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT;

app.use("/api/v1/user", userRoutes);
app.use("/", (req, res) => {
  res.send("Hello world");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on : http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Database connection error");
    process.exit(1);
  });
