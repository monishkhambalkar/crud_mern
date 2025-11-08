const express = require("express");
const cors = require("cors");
const ENV = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve local uploads in development
if (ENV.NODE_ENV === "development") {
  app.use("/uploads", express.static("uploads"));
}

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT} (${ENV.NODE_ENV})`);
});
