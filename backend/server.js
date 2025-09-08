const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const walletRoutes = require("./routes/wallet");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/paymentapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("MongoDB connected"));

// Routes
app.use("/api/wallet", walletRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));