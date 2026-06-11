// Lista dostawców i modeli
const dostawcy = {
    openai: { nazwa: "OpenAI", modele: ["gpt-5.4-mini", "gpt-5.5"] },
    claude: { nazwa: "Claude (Anthropic)", modele: ["claude-haiku-4", "claude-sonnet-4", "claude-opus-4"] },
    gemini: { nazwa: "Gemini (Google)", modele: ["gemini-2.5-flash", "gemini-3-flash", "gemini-3-pro"] },
    openrouter: { nazwa: "OpenRouter", modele: ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4.5", "google/gemini-2.5-flash"] }
};
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
    labelDostawca.htmlFor = "ustawienia-dostawca";
    labelDostawca.textContent = "Dostawca API:";
    panel.appendChild(labelDostawca);

    // Wybór dostawcy API
    const selectDostawca = document.createElement("select");
    selectDostawca.id = "ustawienia-dostawca";
    for (const id in dostawcy) {
        const opcja = document.createElement("option");
        opcja.value = id;
        opcja.textContent = dostawcy[id].nazwa;
        if (id === ustawienia.dostawca) opcja.selected = true;
        selectDostawca.appendChild(opcja);
    }
    panel.appendChild(selectDostawca);


    const labelModel = document.createElement("label");
    labelModel.htmlFor = "ustawienia-model";
    labelModel.textContent = "Model:";
    panel.appendChild(labelModel);

    // Wybór modelu API
    const selectModel = document.createElement("select");
    selectModel.id = "ustawienia-model";
    function odswiezModele(wybranyModel) {
        selectModel.innerHTML = "";
        const modele = dostawcy[selectDostawca.value].modele;

        modele.forEach((model) => {
            const opcja = document.createElement("option");
            opcja.value = model;
            opcja.textContent = model;
            if (model === wybranyModel) opcja.selected = true;
            selectModel.appendChild(opcja);
        });
    }
    odswiezModele(ustawienia.model);
    panel.appendChild(selectModel);

    selectDostawca.addEventListener("change", function () {
        odswiezModele("");
    });

    const labelKlucz = document.createElement("label");
    labelKlucz.htmlFor = "ustawienia-klucz";
    labelKlucz.textContent = "Klucz API:";
    panel.appendChild(labelKlucz);

    const inputKlucz = document.createElement("input");
    inputKlucz.id = "ustawienia-klucz";
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
