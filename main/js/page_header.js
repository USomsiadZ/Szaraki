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

    // Tutaj doda się przejścia
    const topMenu = document.createElement("nav");
    topMenu.className = "top-menu";

    const menuLinkAbout = document.createElement("button");
    menuLinkAbout.id = "menu-home";
    menuLinkAbout.textContent = "Strona główna";
    const menuLinkContact = document.createElement("button");
    menuLinkContact.id = "menu-contact";
    menuLinkContact.textContent = "Kontakt";
    const menuLinkSettings = document.createElement("button");
    menuLinkSettings.id = "menu-settings";
    menuLinkSettings.textContent = "Ustawienia";
    const menuLinkHistory = document.createElement("button");
    menuLinkHistory.id = "menu-history";
    menuLinkHistory.textContent = "Historia";
    topMenu.append(menuLinkAbout, menuLinkContact, menuLinkHistory, menuLinkSettings);

    menuContainer.append(menuCheckBox, menuHamburgerLabel, topMenu);

    const menuTitle = document.createElement("div");
    menuTitle.className = "title";
    menuTitle.textContent = "Rozbijacz morfologiczny📖";

    header.append(menuContainer, menuTitle);

    return header;
}
