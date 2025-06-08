const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./src/db/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const roomRoutes = require("./src/routes/roomRoutes");
const accessoryRoutes = require("./src/routes/accessoryRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const approvalRoutes = require("./src/routes/approvalRoutes");

const bookingService = require("./src/services/bookingService");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/accessory", accessoryRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/approvals", approvalRoutes);

bookingService.autoRejectBookings();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`API is running. DB time: ${result.rows[0].now}`);
  } catch (err) {
    res
      .status(200)
      .send("Database connection error", JSON.stringify(err?.error));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
