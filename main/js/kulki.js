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

    document.body.append(header, stage, historyStage);

    const menuCheckBox = document.getElementById("menu-toggle");
    const menuLinkHistory = document.querySelector(".top-menu a:last-child");
    const menuTitle = document.querySelector(".title");
    const inputBall = document.querySelector("input.ball");

    // Window - ogólne okno
    inputBall.addEventListener("keydown", function (p) {
        if (p.key === "Enter" && !isError && !isUsed) {
            apiKulki(stage, inputBall);
        }
    });

    menuLinkHistory.addEventListener("click", function (e) {
        e.preventDefault();
        stage.style.display = "none";
        historyStage.style.display = "block";
        wyswietlHistorie(historyStage, "data-desc");
        menuCheckBox.checked = false; // zamyka menu po kliknięciu
    });

    menuTitle.addEventListener("click", function () {
        stage.style.display = "flex";
        historyStage.style.display = "none";
    });

    createKulki(stage);
    rozszerzKulki();
});
