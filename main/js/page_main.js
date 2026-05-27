let tab = ["un", "happy", "ness"];
let n = tab.length;
let isError = false;
let isUsed = false;

function createStage() {
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

function createKulki(stage) {
    for (let i = 0; i < n; i++) {
        const smallBall = document.createElement("p");
        smallBall.classList.add("small-ball");
        smallBall.id = `ball${i + 1}`;
        smallBall.textContent = tab[i];
        stage.appendChild(smallBall);
    }
}

function deleteKulki(stage) {
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

function showError(inputBall, msg, duration = 1000) {
    isError = true;
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

function apiKulki(stage, inputBall) {
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

            if (n <= 1) {
                deleteKulki(stage);
                showError(inputBall, "Brak rozbić!");
            } else {
                zapiszDoHistorii(inputBall.value.trim(), tab)
                deleteKulki(stage);
                createKulki(stage);
                rozszerzKulki();
            }
            isUsed = false;
        })
        .catch((err) => {
            isUsed = false;
            console.error(err);
        });
}
