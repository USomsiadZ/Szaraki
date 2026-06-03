function createAboutStage() {
	const aboutStage = document.createElement("div");
	aboutStage.className = "about-stage";
	aboutStage.style.display = "none";
	return aboutStage;
}

function wyswietlONas(aboutStage) {
	aboutStage.innerHTML = "";

	const panel = document.createElement("div");
	panel.className = "about-panel";

	const title = document.createElement("h2");
	title.textContent = "O nas";
	panel.appendChild(title);

	const opis = document.createElement("p");
	opis.textContent = "Grupa trzech ambitnych, przyszłych inżynierów projektuje sobie stronkę do nauki języków w ramach projektu na zajęcia Wprowadzenie do aplikacji WWW z wykorzystaniem m.in API oraz AI.";
	panel.appendChild(opis);

	const szarak = document.createElement("img");
	szarak.src = "img/ikonka.gif";
	szarak.alt = "Szarak";
	szarak.style.cssText = "width: 128px; height: 128px; align-self: center;";
	panel.appendChild(szarak);

	const autorzy = document.createElement("div");
	autorzy.className = "about-authors";

	const autorzyTytul = document.createElement("h3");
	autorzyTytul.textContent = "Autorzy";
	autorzy.appendChild(autorzyTytul);

	const autorzyLista = document.createElement("div");
	autorzyLista.className = "authors-list";

	const leader = document.createElement("div");
	leader.className = "author-card";
	leader.innerHTML = "<span class=\"author-role\">Lider:</span> Hubert Parzych<br>E-mail: 95260@student.pb.edu.pl<br><img class=\"author-photo\" src=\"../img/lider.png\" alt=\"Hubert Parzych\">";
	autorzyLista.appendChild(leader);

	const szarak1 = document.createElement("div");
	szarak1.className = "author-card";
	szarak1.innerHTML = "<span class=\"author-role\">Szarak nr 1:</span> Oliwia Łankiewicz<br>E-mail: 95326@student.pb.edu.pl<br><img class=\"author-photo\" src=\"../img/szarak1.png\" alt=\"Oliwia Lankiewicz\">";
	autorzyLista.appendChild(szarak1);

	const szarak2 = document.createElement("div");
	szarak2.className = "author-card";
	szarak2.innerHTML = "<span class=\"author-role\">Szarak nr 2:</span> Łukasz Kazimierczuk<br>E-mail: 95280@student.pb.edu.pl<br><img class=\"author-photo\" src=\"../img/szarak2.jpg\" alt=\"Lukasz Kazimierczuk\">";
	autorzyLista.appendChild(szarak2);

	autorzy.appendChild(autorzyLista);
	panel.appendChild(autorzy);

	aboutStage.appendChild(panel);
}
