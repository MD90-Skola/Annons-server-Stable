// 📌 Lyssna på formulärets submit-händelse och skicka annons till servern
document.getElementById("annonsForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Stoppar sidan från att ladda om

    // 📌 Skapa ett annons-objekt från formuläret
    const annons = {
        namn: document.getElementById("namn").value,
        alder: document.getElementById("alder").value,
        adress: document.getElementById("adress").value,
        jobbtitel: document.getElementById("jobbtitel").value,
        ovrigt: document.getElementById("ovrigt").value
    };

    try {
        // 📌 Skicka annonsen till backend
        const response = await fetch("/annonser/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(annons)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message); // Bekräftelsemeddelande
            document.getElementById("annonsForm").reset(); // Rensar formuläret
        } else {
            alert("Fel: " + result.error);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Ett nätverksfel uppstod.");
    }
});

// 📌 Hämta alla annonser (Admin)
async function fetchAnnonser() {
    try {
        const response = await fetch("/annonser/admin");
        const annonser = await response.json();
        document.getElementById("result").innerHTML = annonser
            .map(a => `<li>${a.namn}, ${a.jobbtitel}, ${a.adress}</li>`)
            .join("");
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// 📌 Sök annonser baserat på jobbtitel och ort
async function searchAnnonser() {
    // 📌 Hämta söktermer från input-fälten
    const jobbtitel = document.getElementById("searchJobbtitel").value;
    const adress = document.getElementById("searchOrt").value;

    try {
        // 📌 Skicka sökförfrågan till servern
        const response = await fetch(`/annonser/search?jobbtitel=${jobbtitel}&adress=${adress}`);
        const annonser = await response.json();

        // 📌 Visa resultat på sidan
        document.getElementById("searchResult").innerHTML = annonser
            .map(a => `<li>${a.namn}, ${a.jobbtitel}, ${a.adress}</li>`)
            .join("");
    } catch (error) {
        console.error("Fetch error:", error);
    }
}