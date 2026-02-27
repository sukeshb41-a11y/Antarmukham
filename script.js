function saveEntry() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Please write both title and content.");
        return;
    }

    const entry = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };

    let entries = JSON.parse(localStorage.getItem("atmaDiary")) || [];
    entries.unshift(entry);
    localStorage.setItem("atmaDiary", JSON.stringify(entries));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    displayEntries();
}

function displayEntries() {
    const entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";

    let entries = JSON.parse(localStorage.getItem("atmaDiary")) || [];

    entries.forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <h3>${entry.title}</h3>
            <small>${entry.date}</small>
            <p>${entry.content.replace(/\n/g, "<br>")}</p>
        `;
        entriesList.appendChild(div);
    });
}

displayEntries();
// Bhagavad Gita background quotes
const gitaQuotes = [
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। — You have the right to action, not to its fruits.",
    "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्। — No one can remain without action even for a moment.",
    "उद्धरेदात्मनाऽत्मानं — Elevate yourself by your own self.",
    "श्रद्धावान् लभते ज्ञानम् — The faithful attain knowledge.",
    "योगस्थः कुरु कर्माणि — Established in yoga, perform your duties.",
    "वासांसि जीर्णानि यथा विहाय — As one discards worn-out clothes, so the soul discards bodies."
];

function showBackgroundQuote() {
    const quote = gitaQuotes[Math.floor(Math.random() * gitaQuotes.length)];
    const div = document.createElement("div");
    div.className = "gita-quote";
    div.innerText = quote;
    document.body.appendChild(div);
}

showBackgroundQuote();