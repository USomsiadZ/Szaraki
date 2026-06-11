// Lista dostawców i modeli
const dostawcy = {
    openai: { nazwa: "OpenAI", modele: ["gpt-5.4-mini", "gpt-5.5"] },
    claude: { nazwa: "Claude (Anthropic)", modele: ["claude-haiku-4", "claude-sonnet-4", "claude-opus-4"] },
    gemini: { nazwa: "Gemini (Google)", modele: ["gemini-2.5-flash", "gemini-3-flash", "gemini-3-pro"] },
    openrouter: { nazwa: "OpenRouter", modele: ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4.5", "google/gemini-2.5-flash"] }
};
// Tworzymy pusty stage
function createSettingsStage() {
    const settingsStage = document.createElement("div");
    settingsStage.className = "settings-stage";
    settingsStage.style.display = "none";
    return settingsStage;
}

// Odczytaj ustawienia z localStorage
function odczytajUstawienia() {
    const zapisane = JSON.parse(localStorage.getItem("ustawieniaApi")) || {};
    const dostawca = zapisane.dostawca || "openai";
    return {
        dostawca: dostawca,
        model: zapisane.model || dostawcy[dostawca].modele[0],
        klucz: zapisane.klucz || ""
    };
}

// Zapisz ustawienia do localStorage
function zapiszUstawienia(dostawca, model, klucz) {
    localStorage.setItem("ustawieniaApi", JSON.stringify({ dostawca, model, klucz }));
}

function wyswietlUstawienia(settingsStage) {
    settingsStage.innerHTML = "";
    const ustawienia = odczytajUstawienia();

    const panel = document.createElement("div");
    panel.className = "settings-panel";

    const tytul = document.createElement("h2");
    tytul.textContent = "Ustawienia API";
    panel.appendChild(tytul);

    const labelDostawca = document.createElement("label");
    labelDostawca.textContent = "Dostawca API:";
    panel.appendChild(labelDostawca);

    const selectDostawca = document.createElement("select");
    for (const id in dostawcy) {
        const opcja = document.createElement("option");
        opcja.value = id;
        opcja.textContent = dostawcy[id].nazwa;
        if (id === ustawienia.dostawca) opcja.selected = true;
        selectDostawca.appendChild(opcja);
    }
    panel.appendChild(selectDostawca);

    const labelModel = document.createElement("label");
    labelModel.textContent = "Model:";
    panel.appendChild(labelModel);
    const selectModel = document.createElement("select");
    function odswiezModele(wybranyModel) {
        selectModel.innerHTML = "";
        const modele = dostawcy[selectDostawca.value].modele;

        for (let i = 0; i < modele.length; i++) {
            const model = modele[i];

            const opcja = document.createElement("option");
            opcja.value = model;
            opcja.textContent = model;
            // Z pamięci, normalnie ogarnia to html
            if (model === wybranyModel) {
                opcja.selected = true;
            }

            selectModel.appendChild(opcja);
        }
    }
    odswiezModele(ustawienia.model);
    selectDostawca.addEventListener("change", function () {
        odswiezModele("");
    });
    panel.appendChild(selectModel);

    const labelKlucz = document.createElement("label");
    labelKlucz.textContent = "Klucz API:";
    panel.appendChild(labelKlucz);

    const inputKlucz = document.createElement("input");
    inputKlucz.type = "password";
    inputKlucz.value = ustawienia.klucz;
    panel.appendChild(inputKlucz);

    const przyciskZapisz = document.createElement("button");
    przyciskZapisz.textContent = "Zapisz";

    przyciskZapisz.addEventListener("click", function () {
        zapiszUstawienia(selectDostawca.value, selectModel.value, inputKlucz.value.trim());
    });

    panel.appendChild(przyciskZapisz);
    settingsStage.appendChild(panel);
}
