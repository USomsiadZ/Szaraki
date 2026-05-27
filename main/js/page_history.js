function createHistoryStage() {
    const historyStage = document.createElement("div");
    historyStage.className = "history-stage";
    historyStage.style.display = "none";
    return historyStage;
}

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
        historyStage.innerHTML = "<p style='color: white; text-align:center; padding: 20px;'>Brak wpisów w historii.</p>";
        return;
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
    panelSortowania.style.cssText = "display:flex; gap:10px; justify-content:center; padding:20px; flex-wrap:wrap;";

    const opcje = [
        { id: "data-desc", text: "Najnowsze" },
        { id: "data-asc", text: "Najstarsze" },
        { id: "alfabetycznie", text: "Alfabetycznie" },
        { id: "morfemy-ilosc", text: "Ilość morfemów" }
    ];

    opcje.forEach(opcja => {
        const przycisk = document.createElement("button");
        przycisk.textContent = opcja.text;
        przycisk.style.cssText = `padding: 8px 12px; cursor: pointer; border-radius: 5px; border: none; background: ${sortowanie === opcja.id ? '#7e7e7e' : '#515363'}; color: white; font-weight: ${sortowanie === opcja.id ? 'bold' : 'normal'}`;
        przycisk.addEventListener("click", () => wyswietlHistorie(historyStage, opcja.id));
        panelSortowania.appendChild(przycisk);
    });

    historyStage.appendChild(panelSortowania);

    const lista = document.createElement("div");
    lista.style.cssText = "max-width: 600px; margin: 0 auto; padding: 20px; display: flex; flex-direction: column; gap: 15px;";

    historia.forEach(wpis => {
        const element = document.createElement("div");
        element.style.cssText = "background: #515363; padding: 15px; border-radius: 8px; color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.2); text-align: left;";

        const dataFormat = new Date(wpis.data).toLocaleString("pl-PL");

        element.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 8px; border-bottom: 1px solid #3a3c4a; padding-bottom: 5px;">
                    <strong>${wpis.slowo}</strong>
                    <span style="font-size: 12px; color: #ccc;">${dataFormat}</span>
                </div>
                <div>Morfemy: <span style="color: #61dafb; font-weight: bold;">${wpis.morfemy.join(" • ")}</span></div>
            `;
        lista.appendChild(element);
    });

    historyStage.appendChild(lista);
}
