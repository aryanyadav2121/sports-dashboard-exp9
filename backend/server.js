require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

app.get("/", (req, res) => {
    res.send("Sports Dashboard Backend is Running");
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});