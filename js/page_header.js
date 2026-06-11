function createHeader() {
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
    menuHamburgerLabel.setAttribute("aria-label", "Otwórz menu");

    const topMenu = document.createElement("nav");
    topMenu.className = "top-menu";
    topMenu.setAttribute("aria-label", "Menu główne");

    const menuLinkMain = document.createElement("button");
    menuLinkMain.id = "menu-home";
    menuLinkMain.textContent = "🏠 Strona główna";
    const menuLinkSettings = document.createElement("button");
    menuLinkSettings.id = "menu-settings";
    menuLinkSettings.textContent = "⚙️ Ustawienia";
    const menuLinkHistory = document.createElement("button");
    menuLinkHistory.id = "menu-history";
    menuLinkHistory.textContent = "🕐 Historia";
    const menuLinkAbout = document.createElement("button");
    menuLinkAbout.id = "menu-about";
    menuLinkAbout.textContent = "👥 O nas";
    topMenu.append(menuLinkMain, menuLinkHistory, menuLinkSettings, menuLinkAbout);

    menuContainer.append(menuCheckBox, menuHamburgerLabel, topMenu);

    const menuTitle = document.createElement("div");
    menuTitle.className = "title";

    const menuTitleText = document.createElement("span");
    menuTitleText.className = "title-text";
    menuTitleText.textContent = "Rozbijacz morfologiczny 📖";
    menuTitle.appendChild(menuTitleText);

    header.append(menuContainer, menuTitle);

    return header;
}
