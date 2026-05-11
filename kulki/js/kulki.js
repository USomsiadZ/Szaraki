/*   https://www.w3schools.com/js/js_events_load.asp   */
/*   https://www.w3schools.com/jsref/met_win_settimeout.asp   */
const tab = ["un", "happy", "ness"];
const n = tab.length;

document.addEventListener("DOMContentLoaded", function () {
    const stage = document.querySelector(".balls-stage");
    const input = document.querySelector("input.ball");
    for (let i = 0; i < n; i++) {
        const smallBall = document.createElement("p");
        smallBall.classList.add("small-ball");
        smallBall.id = `ball${i + 1}`;
        smallBall.textContent = tab[i];
        stage.appendChild(smallBall);
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

    input.addEventListener("keydown", function (p) {
        if (p.key === "Enter") {
            rozszerzKulki();
        }
    });
});
