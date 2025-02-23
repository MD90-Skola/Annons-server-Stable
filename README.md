# Annons-server-Stable

Annons-server-Stable är en **lokal Node.js-baserad webbserver** med en **integrerad databas**, byggd för att hantera annonser. Projektet fungerar som en **local host-server** och inkluderar ett REST API för att hantera annonsdata.

## 🛠 Teknologier
- **Node.js** - Servermiljö
- **Express.js** - Backend-ramverk
- **SQLite** - Databas
- **JavaScript, HTML & CSS** - Frontend

## 🚀 Funktioner
- **Lokal annonsserver** med möjlighet att hantera annonser
- **REST API** för att lägga till, hämta och ta bort annonser
- **SQLite-databas** för att lagra annonser
- **Bootstrap & CSS** för frontend-design

## 📂 Strukturen i projektet
```
📁 NodeJS_Webhost
 ├── 📁 routes         # API-routes
 │    ├── annonser.js  # Hanterar API-anrop för annonser
 │
 ├── 📁 www            # Frontend-filer (HTML, CSS, JS)
 │    ├── index.html   # Startsida
 │    ├── script.js    # Hanterar frontend-logik
 │    ├── style.css    # Styling
 │
 ├── app.js            # Huvudfil för att starta servern
 ├── server.js         # Express-server
 ├── database.db       # SQLite-databas
 ├── package.json      # Projektets beroenden och konfiguration
```

## ⚙️ Installation
### 1. Klona projektet
```bash
git clone git@github.com:MD90-Skola/Annons-server-Stable.git
cd Annons-server-Stable
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Starta servern
```bash
node server.js
```
Servern körs nu lokalt på **http://localhost:3000**.

## 📡 API-endpoints
| Metod  | Endpoint       | Beskrivning              |
|--------|---------------|--------------------------|
| GET    | /annonser     | Hämta alla annonser      |
| POST   | /annonser     | Lägg till en annons      |
| DELETE | /annonser/:id | Ta bort en annons       |

## 🛠 Kommandon
### Starta server
```bash
node server.js
```
### Ladda upp till GitHub
```bash
git add .
git commit -m "Ditt meddelande"
git push origin main
```

## 📌 Noteringar
- Projektet är **lokalt**, vilket innebär att du måste ha **Node.js** installerat för att köra det.
- **SQLite-databasen** sparas lokalt och är inkluderad i projektmappen.

## ✨ Förbättringar i framtiden
- Möjlighet att köra i molnet
- Utökad databasfunktionalitet
- Mer avancerad frontend

---
📌 **Byggt av Michel Dahl** | 🚀 **MD90-Skola**
