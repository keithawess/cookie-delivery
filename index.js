require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/users.routes");
const folkRoutes = require("./server/routes/folk.routes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/folk", folkRoutes);

app.listen(PORT, () => console.log("Connected"));