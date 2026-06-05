/*   https://www.w3schools.com/js/js_events_load.asp   */
/*   https://www.w3schools.com/jsref/met_win_settimeout.asp   */
// Najpierw dodanie do stage potem do body - dla wydajności

document.addEventListener("DOMContentLoaded", function () {
    //const stage = document.querySelector(".balls-stage");
    //const inputBall = document.querySelector("input.ball");
    // zmienna o nazwie api zawiera klucz do openai

    const header = createHeader();
    const stage = createStage();
    const historyStage = createHistoryStage();
    const settingsStage = createSettingsStage();
    const aboutStage = createAboutStage();

    document.body.append(header, stage, historyStage, settingsStage, aboutStage);

    const menuCheckBox = document.getElementById("menu-toggle");
    const menuLinkSettings = document.getElementById("menu-settings");
    const menuLinkHistory = document.getElementById("menu-history");
    const menuLinkAbout = document.getElementById("menu-about");
    const menuTitle = document.querySelector(".title .title-text");
    const inputBall = document.querySelector("input.ball");

    // Window - ogólne okno
    inputBall.addEventListener("keydown", function (p) {
        if (p.key === "Enter" && !isError && !isUsed) {
            apiKulki(stage, inputBall);
        }
    });

    menuLinkHistory.addEventListener("click", function () {
        stage.style.display = "none";
        historyStage.style.display = "block";
        settingsStage.style.display = "none";
        aboutStage.style.display = "none";
        wyswietlHistorie(historyStage, "data-desc");
        menuCheckBox.checked = false; // zamyka menu po kliknięciu
    });

    menuLinkSettings.addEventListener("click", function () {
        stage.style.display = "none";
        historyStage.style.display = "none";
        settingsStage.style.display = "block";
        aboutStage.style.display = "none";
        wyswietlUstawienia(settingsStage);
        menuCheckBox.checked = false;
    });

    menuLinkAbout.addEventListener("click", function () {
        stage.style.display = "none";
        historyStage.style.display = "none";
        settingsStage.style.display = "none";
        aboutStage.style.display = "block";
        wyswietlONas(aboutStage);
        menuCheckBox.checked = false;
    });

    function domenuLinkHome() {
        stage.style.display = "flex";
        historyStage.style.display = "none";
        settingsStage.style.display = "none";
        aboutStage.style.display = "none";
        menuCheckBox.checked = false;
    }

    document.getElementById("menu-home").addEventListener("click", domenuLinkHome);
    menuTitle.addEventListener("click", domenuLinkHome);

    createKulki(stage);
    rozszerzKulki();

    // Responsywność: przy zmianie rozmiaru okna przelicz promień kulek
    window.addEventListener("resize", rozszerzKulki);
});
