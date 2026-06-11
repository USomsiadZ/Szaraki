const paginacja_max = 5;

function zapiszDoHistorii(slowo, morfemy) {
    let historia = JSON.parse(localStorage.getItem("morfologiaHistoria")) || [];

    historia.unshift({
        slowo: slowo,
        morfemy: morfemy,
        data: new Date().toISOString()
    });

    localStorage.setItem("morfologiaHistoria", JSON.stringify(historia));
}

function usunZHistorii(data) {
    let historia = JSON.parse(localStorage.getItem("morfologiaHistoria")) || [];
    historia = historia.filter(wpis => wpis.data !== data);
    localStorage.setItem("morfologiaHistoria", JSON.stringify(historia));
}

function wyswietlHistorie(historyStage, sortowanie = "data-desc", ile = paginacja_max) {
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

    let sumaMorfemow = 0;
    historia.forEach(wpis => {
        sumaMorfemow = sumaMorfemow + wpis.morfemy.length;
    });
    const ilosc = historia.length;
    const srednia = Math.round((sumaMorfemow / ilosc) * 10) / 10;

    const panelStatystyk = document.createElement("div");
    panelStatystyk.className = "history-statystyki-panel";
    const tekstStatystyk = document.createElement("span");
    tekstStatystyk.className = "history-sort-btn";
    tekstStatystyk.textContent = `Ilość: ${ilosc} Średnia: ${srednia}`;
    panelStatystyk.appendChild(tekstStatystyk);
    historyStage.appendChild(panelStatystyk);

    const lista = document.createElement("div");
    lista.className = "history-list";
    historia.slice(0, ile).forEach(wpis => {
        const element = document.createElement("div");
        element.className = "history-item";
        const dataFormat = new Date(wpis.data).toLocaleString("pl-PL");

        element.innerHTML = `
                <div class="history-item-header">
                    <strong>${wpis.slowo}</strong>
                    <span class="history-item-date">${dataFormat}</span>
                </div>
                <div class="history-item-row">
                    <div class="history-item-morfemy">Morfemy: <span>${wpis.morfemy.join(" ⁕ ")}</span></div>
                </div>
            `;

        const przyciskUsun = document.createElement("button");
        przyciskUsun.textContent = "Usuń";
        przyciskUsun.className = "history-delete-btn";
        przyciskUsun.addEventListener("click", function () {
            usunZHistorii(wpis.data);
            wyswietlHistorie(historyStage, sortowanie, ile);
        });
        element.querySelector(".history-item-row").appendChild(przyciskUsun);

        lista.appendChild(element);
    });

    historyStage.appendChild(lista);

    if (ile < historia.length) {
        const przyciskWiecej = document.createElement("button");
        przyciskWiecej.textContent = "Załaduj więcej";
        przyciskWiecej.className = "history-load-more-btn";
        przyciskWiecej.addEventListener("click", function () {
            wyswietlHistorie(historyStage, sortowanie, ile + paginacja_max);
        });
        historyStage.appendChild(przyciskWiecej);
    }
}
