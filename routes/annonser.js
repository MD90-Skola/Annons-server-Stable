const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

const db = new sqlite3.Database("./database.db");

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

// 📌 Lägg till en ny annons
router.post("/add", (req, res) => {
    const { namn, alder, adress, jobbtitel, ovrigt } = req.body;
    
    if (!namn || !alder || !adress || !jobbtitel) {
        return res.status(400).json({ error: "Alla fält utom 'övrigt' måste fyllas i" });
    }

    db.run(
        "INSERT INTO annonser (namn, alder, adress, jobbtitel, ovrigt) VALUES (?, ?, ?, ?, ?)",
        [namn, alder, adress, jobbtitel, ovrigt || ""],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Annons tillagd!" });
        }
    );
});

// 📌 Sök annonser (visar bara adress och jobbtitel)
router.get("/search", (req, res) => {
    const { adress, jobbtitel } = req.query;
    let query = "SELECT jobbtitel, adress FROM annonser WHERE 1=1";
    let params = [];

    if (adress) {
        query += " AND adress LIKE ?";
        params.push(`%${adress}%`);
    }
    if (jobbtitel) {
        query += " AND jobbtitel LIKE ?";
        params.push(`%${jobbtitel}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 📌 Admin: Visa alla annonser
router.get("/admin", (req, res) => {
    db.all("SELECT * FROM annonser", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;