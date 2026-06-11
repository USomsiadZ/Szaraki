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
	const leaderRole = document.createElement("h2");
	leaderRole.className = "author-role";
	leaderRole.textContent = "Lider";
	const leaderName = document.createElement("p");
	leaderName.textContent = "Hubert Parzych";
	const leaderEmail = document.createElement("p");
	leaderEmail.textContent = "E-mail: 95260@student.pb.edu.pl";
	const leaderImg = document.createElement("img");
	leaderImg.className = "author-photo";
	leaderImg.src = "img/lider.png";
	leaderImg.alt = "Hubert Parzych";
	leader.append(leaderRole, leaderName, leaderEmail, leaderImg);
	autorzyLista.appendChild(leader);

	const szarak1 = document.createElement("div");
	szarak1.className = "author-card";
	const szarak1Role = document.createElement("h2");
	szarak1Role.className = "author-role";
	szarak1Role.textContent = "Szarak nr 1";
	const szarak1Name = document.createElement("p");
	szarak1Name.textContent = "Oliwia Łankiewicz";
	const szarak1Email = document.createElement("p");
	szarak1Email.textContent = "E-mail: 95326@student.pb.edu.pl";
	const szarak1Img = document.createElement("img");
	szarak1Img.className = "author-photo";
	szarak1Img.src = "img/szarak1.png";
	szarak1Img.alt = "Oliwia Lankiewicz";
	szarak1.append(szarak1Role, szarak1Name, szarak1Email, szarak1Img);
	autorzyLista.appendChild(szarak1);

	const szarak2 = document.createElement("div");
	szarak2.className = "author-card";
	const szarak2Role = document.createElement("h2");
	szarak2Role.className = "author-role";
	szarak2Role.textContent = "Szarak nr 2";
	const szarak2Name = document.createElement("p");
	szarak2Name.textContent = "Łukasz Kazimierczuk";
	const szarak2Email = document.createElement("p");
	szarak2Email.textContent = "E-mail: 95280@student.pb.edu.pl";
	const szarak2Img = document.createElement("img");
	szarak2Img.className = "author-photo";
	szarak2Img.src = "img/szarak2.jpg";
	szarak2Img.alt = "Lukasz Kazimierczuk";
	szarak2.append(szarak2Role, szarak2Name, szarak2Email, szarak2Img);
	autorzyLista.appendChild(szarak2);
	autorzy.appendChild(autorzyLista);
	panel.appendChild(autorzy);


	const formularzSekcja = document.createElement("div");
	formularzSekcja.className = "contact-section";

	const formularzTytul = document.createElement("h3");
	formularzTytul.textContent = "Napisz do nas";
	formularzSekcja.appendChild(formularzTytul);

	const formularz = document.createElement("form");
	formularz.className = "contact-form";

	const labelImie = document.createElement("label");
	labelImie.textContent = "Imię i nazwisko";
	const inputImie = document.createElement("input");
	inputImie.type = "text";
	inputImie.placeholder = "np. Andrzej Duda";
	inputImie.className = "form-input";
	inputImie.required = true;
	inputImie.pattern = "[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\\s'\\-]+";
	inputImie.title = "Nazwa nie może zawierać znaków specjalnych.";

	const labelEmail = document.createElement("label");
	labelEmail.textContent = "E-mail";
	const inputEmail = document.createElement("input");
	inputEmail.type = "email";
	inputEmail.placeholder = "np. student@pb.edu.pl";
	inputEmail.className = "form-input";
	inputEmail.required = true;

	const labelTresc = document.createElement("label");
	labelTresc.textContent = "Treść wiadomości";
	const inputTresc = document.createElement("textarea");
	inputTresc.placeholder = "Twoja wiadomość (max 256 znaków)";
	inputTresc.className = "form-input form-textarea";
	inputTresc.maxLength = 256;
	inputTresc.required = true;

	const przycisk = document.createElement("button");
	przycisk.type = "submit";
	przycisk.textContent = "Wyślij wiadomość";
	przycisk.className = "form-btn";

	const komunikat = document.createElement("div");
	komunikat.className = "formularzKomunikat";
	komunikat.textContent = "Wiadomość została wysłana!";

	formularz.addEventListener("submit", (e) => {
		e.preventDefault();

		const wpis = {
			imie_i_nazwisko: inputImie.value.trim(),
			adres_email: inputEmail.value.trim(),
			wiadomosc: inputTresc.value.trim(),
		};

		const poczta = JSON.parse(localStorage.getItem("wiadomosci") || "[]");
		poczta.push(wpis);
		localStorage.setItem("wiadomosci", JSON.stringify(poczta));

		formularz.reset();

		komunikat.classList.add("show");

		setTimeout(() => {
			komunikat.classList.remove("show");
		}, 3000);

	});

	formularz.append(labelImie, inputImie, labelEmail, inputEmail, labelTresc, inputTresc, przycisk, komunikat);
	formularzSekcja.appendChild(formularz);
	panel.appendChild(formularzSekcja);

	aboutStage.appendChild(panel);
}
