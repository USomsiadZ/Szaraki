/*   https://www.w3schools.com/js/js_events_load.asp   */
/*   https://www.w3schools.com/jsref/met_win_settimeout.asp   */
// Najpierw dodanie do stage potem do body - dla wydajności
let tab = ["un", "happy", "ness"];
let n = tab.length;

document.addEventListener("DOMContentLoaded", function () {
    //const stage = document.querySelector(".balls-stage");
    //const inputBall = document.querySelector("input.ball");
    // zmienna o nazwie api zawiera klucz do openai
    //Generowanie html
    const header = document.createElement("header");
    header.className = "header";

    const menuContainer = document.createElement("div");
    menuContainer.className = "menu-container";

    const menuCheckBox = document.createElement("input");
    menuCheckBox.type = "checkbox";
    menuCheckBox.id = "menu-toggle";
    menuCheckBox.className = "menu-checkbox";

    const menuHamburgerLabel = document.createElement("label");
    menuHamburgerLabel.htmlFor = "menu-toggle";
    menuHamburgerLabel.className = "hamburger-icon";
    menuHamburgerLabel.textContent = "☰";

    // Tutaj doda się przejścia
    const topMenu = document.createElement("nav");
    topMenu.className = "top-menu";

    const menuLinkAbout = document.createElement("a");
    menuLinkAbout.textContent = "O nas";
    const menuLinkContact = document.createElement("a");
    menuLinkContact.textContent = "Kontakt";
    const menuLinkSettings = document.createElement("a");
    menuLinkSettings.textContent = "Ustawienia";
    const menuLinkHistory = document.createElement("a");
    menuLinkHistory.textContent = "Historia";
    topMenu.append(menuLinkAbout, menuLinkContact, menuLinkSettings, menuLinkHistory);

    menuContainer.append(menuCheckBox, menuHamburgerLabel, topMenu);

    const menuTitle = document.createElement("div");
    menuTitle.className = "title";
    menuTitle.textContent = "Rozbijacz morfologiczny📖";

    header.append(menuContainer, menuTitle);

    // Balls
    const stage = document.createElement("div");
    const inputBall = document.createElement("input");

    const historyStage = document.createElement("div");
    historyStage.className = "history-stage";
    historyStage.style.display = "none";

    stage.className = "balls-stage";
    inputBall.type = "text";
    inputBall.className = "ball";
    inputBall.value = "unhappiness";
    inputBall.setAttribute("autocomplete", "off");
    stage.appendChild(inputBall);

    document.body.append(header, stage, historyStage);

    function createKulki() {
        for (let i = 0; i < n; i++) {
            const smallBall = document.createElement("p");
            smallBall.classList.add("small-ball");
            smallBall.id = `ball${i + 1}`;
            smallBall.textContent = tab[i];
            stage.appendChild(smallBall);
        }
    }
    function deleteKulki() {
        /*
        const smallBalls = document.getElementsByClassName("small-ball");
        for (let i = 0; i < smallBalls.length; i++) {
            smallBalls[i].remove();
        }
        */
        stage.querySelectorAll(".small-ball").forEach((el) => el.remove());
    }
    function rozszerzKulki() {
        setTimeout(() => {
            for (let i = 0; i < n; i++) {
                const ball = document.getElementById(`ball${i + 1}`);
                const angle = (i / n) * Math.PI * 2;
                // cos - x
                // sin - y
                // 200 - dalekość
                // x = r*cos(angle)
                // y = r*sin(angle)
                ball.style.transform = `translate(${Math.cos(angle) * 200}px, ${Math.sin(angle) * 200}px)`;
            }
        }, 300);
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

    function wyswietlHistorie(sortowanie = "data-desc") {
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
            przycisk.addEventListener("click", () => wyswietlHistorie(opcja.id));
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

    let isError = false;
    let isUsed = false;

    function showError(msg, duration = 1000) {
        isError = true;
        deleteKulki();
        const savedValue = inputBall.value;
        inputBall.value = msg;
        inputBall.style.transform = "scale(1.8)";
        inputBall.style.backgroundColor = "#FF6D52";
        setTimeout(() => {
            inputBall.style.transform = "";
            inputBall.style.backgroundColor = "";
            inputBall.value = savedValue;
            isError = false;
        }, duration);
    }

    function apiKulki() {
        isUsed = true;
        // Wykład nr 5
        const requestBody = {
            model: "gpt-5.4-mini",
            messages: [
                {
                    role: "user",
                    content:
                        `Rozłóż morfematycznie słowo "${inputBall.value.trim()}" na kolejne morfemy w kolejności od lewej do prawej (prefiksy, rdzeń, sufiksy). Liczba elementów ma wynikać z analizy — nie narzucaj stałej długości listy. Odpowiedz wyłącznie jednym obiektem JSON, bez markdownu, w formacie {"parts":["fragment", "..."]} gdzie "parts" to tablica o zmiennej długości.`,
                },
            ],
            response_format: { type: "json_object" }
        };
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + api,
            },
            // Openai oczekuje JSON
            body: JSON.stringify(requestBody),
        })
            .then((r) => r.json())
            .then((d) => {
                tab = JSON.parse(d.choices[0].message.content).parts;
                n = tab.length;
<<<<<<< HEAD
                
                if (n == 1 || n == 0) {
                    deleteKulki();
                    let pierwotna_nazwa = inputBall.value;
                    inputBall.value = "Brak rozbić!";
                    inputBall.style.transform = "scale(1.8)";
                    inputBall.style.transition = "transform 0.3s ease";
                    inputBall.style.backgroundColor = "#FF6D52";
                    setTimeout(() => {
                        inputBall.style.backgroundColor = "";
                        inputBall.value = pierwotna_nazwa;
                        inputBall.style.transform = "scale(1)";
                        inputBall.style.transition = "transform 0.3s ease";
                    }, 1000);
=======
                zapiszDoHistorii(inputBall.value.trim(), tab);
                if (n <= 1) {
                    showError("Brak rozbić!");
>>>>>>> 6f8e5789787dc7bfaf3c80e37b03770eba91c584
                } else {
                    zapiszDoHistorii(inputBall.value.trim(),tab)
                    deleteKulki();
                    createKulki();
                    rozszerzKulki();
                }
                isUsed = false;
            })
            .catch((err) => {
                isUsed = false;
                console.error(err);
            });
    }



    // Window - ogólne okno
    inputBall.addEventListener("keydown", function (p) {
        if (p.key === "Enter" && !isError && !isUsed) {
            apiKulki();
        }
    });

    menuLinkHistory.addEventListener("click", function (e) {
        e.preventDefault();
        stage.style.display = "none";
        historyStage.style.display = "block";
        wyswietlHistorie("data-desc");
        menuCheckBox.checked = false; // zamyka menu po kliknięciu
    });

    menuTitle.addEventListener("click", function () {
        stage.style.display = "flex";
        historyStage.style.display = "none";
    });

    createKulki();
    rozszerzKulki();
});


