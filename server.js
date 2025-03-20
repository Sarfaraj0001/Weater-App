require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");  // ✅ Add this line

const app = express();
app.use(cors());

// ✅ Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve `index.html` when visiting the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve API Key & URL to frontend
app.get("/config", (req, res) => {
    res.json({
        apiKey: process.env.API_KEY,
        apiUrl: process.env.API_URL
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

