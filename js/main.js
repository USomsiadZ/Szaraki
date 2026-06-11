// Czekamy aż dokument się załaduje, bo może się okazać że nie ma jeszcze body.
document.addEventListener("DOMContentLoaded", function () {
    const header = createHeader();
    const mainstage = createMainStage();
    const historyStage = createHistoryStage();
    const settingsStage = createSettingsStage();
    const aboutStage = createAboutStage();
    // Najpierw dodajemy elementy do stage potem dopiero pokazujemy dla wydajności
    document.body.append(header, mainstage, historyStage, settingsStage, aboutStage);

    const menuCheckBox = document.getElementById("menu-toggle");
    const menuLinkSettings = document.getElementById("menu-settings");
    const menuLinkHistory = document.getElementById("menu-history");
    const menuLinkAbout = document.getElementById("menu-about");
    const menuTitle = document.querySelector(".title .title-text");
    const inputBall = document.querySelector("input.ball");

    inputBall.addEventListener("keydown", function (p) {
        if (p.key === "Enter" && !isError && !isUsed) {
            apiKulki(mainstage, inputBall);
        }
    });
    // Historia
    menuLinkHistory.addEventListener("click", function () {
        mainstage.style.display = "none";
        historyStage.style.display = "block";
        settingsStage.style.display = "none";
        aboutStage.style.display = "none";
        wyswietlHistorie(historyStage, "data-desc");
        menuCheckBox.checked = false; // zamyka menu po kliknięciu
    });

    // Ustawienia
    menuLinkSettings.addEventListener("click", function () {
        mainstage.style.display = "none";
        historyStage.style.display = "none";
        settingsStage.style.display = "block";
        aboutStage.style.display = "none";
        wyswietlUstawienia(settingsStage);
        menuCheckBox.checked = false;
    });

    // O nas
    menuLinkAbout.addEventListener("click", function () {
        mainstage.style.display = "none";
        historyStage.style.display = "none";
        settingsStage.style.display = "none";
        aboutStage.style.display = "block";
        wyswietlONas(aboutStage);
        menuCheckBox.checked = false;
    });

    // Strona główna
    function showMainPage() {
        mainstage.style.display = "flex";
        historyStage.style.display = "none";
        settingsStage.style.display = "none";
        aboutStage.style.display = "none";
        menuCheckBox.checked = false;
    }
    document.getElementById("menu-home").addEventListener("click", showMainPage);
    menuTitle.addEventListener("click", showMainPage);

    createKulki(mainstage);
    rozszerzKulki();

    // Responsywność: przy zmianie rozmiaru okna przelicz promień kulek
    window.addEventListener("resize", rozszerzKulki);
});
