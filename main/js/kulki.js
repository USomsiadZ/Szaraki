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
    topMenu.append(menuLinkAbout, menuLinkContact, menuLinkSettings);

    menuContainer.append(menuCheckBox, menuHamburgerLabel, topMenu);

    const menuTitle = document.createElement("div");
    menuTitle.className = "title";
    menuTitle.textContent = "Słownik📖";

    header.append(menuContainer, menuTitle);

    // Balls
    const stage = document.createElement("div");
    const inputBall = document.createElement("input");
    stage.className = "balls-stage";
    inputBall.type = "text";
    inputBall.className = "ball";
    inputBall.value = "unhappiness";
    inputBall.setAttribute("autocomplete", "off");
    stage.appendChild(inputBall);

    document.body.append(header, stage);

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

    function apiKulki() {
        const requestBody = {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content:
                        `Rozłóż morfematycznie słowo "${inputBall.value.trim()}" na kolejne morfemy w kolejności od lewej do prawej (prefiksy, rdzeń, sufiksy). Liczba elementów ma wynikać z analizy — nie narzucaj stałej długości listy. Odpowiedz wyłącznie jednym obiektem JSON, bez markdownu, w formacie {"parts":["fragment", "..."]} gdzie "parts" to tablica o zmiennej długości.`,
                },
            ],
        };
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + api,
            },
            body: JSON.stringify(requestBody),
        })
            .then((r) => r.json())
            .then((d) => {
                const p = JSON.parse(d.choices[0].message.content.match(/\{[\s\S]*\}/)[0]).parts;
                tab = p.map(String);
                n = tab.length;
                deleteKulki();
                createKulki();
                rozszerzKulki();
            })
            .catch(console.error);
    }



    // Window - ogólne okno
    inputBall.addEventListener("keydown", function (p) {
        if (p.key === "Enter") {
            apiKulki();
        }
    });
});
