function createMainStage() {
    const stage = document.createElement("div");
    const inputBall = document.createElement("input");

    stage.className = "balls-stage";
    inputBall.type = "text";
    inputBall.className = "ball";
    inputBall.value = "unhappiness";
    inputBall.setAttribute("autocomplete", "off");
    stage.appendChild(inputBall);

    return stage;
}

function createHistoryStage() {
    const historyStage = document.createElement("div");
    historyStage.className = "history-stage";
    return historyStage;
}

function createSettingsStage() {
    const settingsStage = document.createElement("div");
    settingsStage.className = "settings-stage";
    settingsStage.style.display = "none";
    return settingsStage;
}

function createAboutStage() {
    const aboutStage = document.createElement("div");
    aboutStage.className = "about-stage";
    aboutStage.style.display = "none";
    return aboutStage;
}
