function zapiszDoHistorii(slowo, morfemy) {
    let historia = JSON.parse(localStorage.getItem("morfologiaHistoria")) || [];

    historia.unshift({
        slowo: slowo,
        morfemy: morfemy,
        data: new Date().toISOString()
    });

    localStorage.setItem("morfologiaHistoria", JSON.stringify(historia));
}

function wyswietlHistorie(historyStage, sortowanie = "data-desc") {
    historyStage.innerHTML = "";

    let historia = JSON.parse(localStorage.getItem("morfologiaHistoria")) || [];

    if (historia.length === 0) {
        historyStage.innerHTML = "<p class='history-empty-msg'>Brak wpisów w historii.</p>"; return;
    }

    if (sortowanie === "data-desc") {
        historia.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else if (sortowanie === "data-asc") {
        historia.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (sortowanie === "alfabetycznie") {
        historia.sort((a, b) => a.slowo.localeCompare(b.slowo));
    } else if (sortowanie === "morfemy-ilosc") {
        historia.sort((a, b) => b.morfemy.length - a.morfemy.length);
    }

    const panelSortowania = document.createElement("div");
    panelSortowania.className = "history-sort-panel";

    const opcje = [
        { id: "data-desc", text: "Najnowsze" },
        { id: "data-asc", text: "Najstarsze" },
        { id: "alfabetycznie", text: "Alfabetycznie" },
        { id: "morfemy-ilosc", text: "Ilość morfemów" }
    ];

    opcje.forEach(opcja => {
        const przycisk = document.createElement("button");
        przycisk.textContent = opcja.text;
        przycisk.className = "history-sort-btn";

        if (sortowanie === opcja.id) {
            przycisk.classList.add("active");
        }

        przycisk.addEventListener("click", () => wyswietlHistorie(historyStage, opcja.id));
        panelSortowania.appendChild(przycisk);
    });

    historyStage.appendChild(panelSortowania);

    const lista = document.createElement("div");
    lista.className = "history-list";
    historia.forEach(wpis => {
        const element = document.createElement("div");
        element.className = "history-item";
        const dataFormat = new Date(wpis.data).toLocaleString("pl-PL");

        element.innerHTML = `
                <div class="history-item-header">
                    <strong>${wpis.slowo}</strong>
                    <span class="history-item-date">${dataFormat}</span>
                </div>
                <div class="history-item-morfemy">Morfemy: <span>${wpis.morfemy.join(" ⁕ ")}</span></div>
            `;
        lista.appendChild(element);
    });

    historyStage.appendChild(lista);
}
