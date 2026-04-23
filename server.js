import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ken08991",
    database: "finals"
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// SAVE DATA
app.post("/save", (req, res) => {
     console.log("BODY RECEIVED:", req.body);
    const { message, encrypted, key } = req.body;

    const sql = `
        INSERT INTO note (output_text, encrypted_text, cipher)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [message, encrypted, String(key)], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving data");
        }
        res.send("Saved successfully");
    });
});

// GET DATA
app.get("/note", (req, res) => {
    db.query("SELECT * FROM note", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});