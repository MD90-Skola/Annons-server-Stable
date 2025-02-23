const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;
const db = new sqlite3.Database("./database.db");

// 📌 Middleware för att tolka JSON
app.use(express.json());

// 📌 Skapa tabellen om den inte finns
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS annonser (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        namn TEXT NOT NULL,
        alder INTEGER NOT NULL,
        adress TEXT NOT NULL,
        jobbtitel TEXT NOT NULL,
        ovrigt TEXT
    )`);
});

// 📌 Gör www/ till statisk mapp
app.use(express.static(path.join(__dirname, "www")));

// 📌 Serve index.html vid /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "www", "index.html"));
});

// 📌 Lägg till en ny annons
app.post("/annonser/add", (req, res) => {
    const { namn, alder, adress, jobbtitel, ovrigt } = req.body;

    if (!namn || !alder || !adress || !jobbtitel) {
        return res.status(400).json({ error: "Alla fält utom 'övrigt' måste fyllas i" });
    }

    db.run(
        "INSERT INTO annonser (namn, alder, adress, jobbtitel, ovrigt) VALUES (?, ?, ?, ?, ?)",
        [namn, alder, adress, jobbtitel, ovrigt || ""],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Annons tillagd!", id: this.lastID });
        }
    );
});

// 📌 Hämta alla annonser (Admin)
app.get("/annonser/admin", (req, res) => {
    db.all("SELECT * FROM annonser", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 📌 Sök annonser baserat på jobbtitel och ort
app.get("/annonser/search", (req, res) => {
    const { jobbtitel, adress } = req.query;
    let query = "SELECT namn, jobbtitel, adress FROM annonser WHERE 1=1";
    let params = [];

    // 📌 Om användaren har fyllt i jobbtitel, lägg till det i SQL-frågan
    if (jobbtitel) {
        query += " AND jobbtitel LIKE ?";
        params.push(`%${jobbtitel}%`);
    }

    // 📌 Om användaren har fyllt i adress (ort), lägg till det i SQL-frågan
    if (adress) {
        query += " AND adress LIKE ?";
        params.push(`%${adress}%`);
    }

    // 📌 Kör SQL-frågan och returnera resultatet
    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        console.log("🔍 Sökuppdrag:", query, params); // 📌 Loggar sökfrågan till terminalen
        res.json(rows);
    });
});

// 📌 Starta servern
app.listen(PORT, () => {
    console.log(`✅ Servern körs på http://localhost:${PORT}`);
});