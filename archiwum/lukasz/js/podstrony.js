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
    topMenu.append(menuLinkAbout, menuLinkContact, menuLinkSettings,menuLinkHistory);

    menuContainer.append(menuCheckBox, menuHamburgerLabel, topMenu);

    const menuTitle = document.createElement("div");
    menuTitle.className = "title";
    menuTitle.textContent = "Rozbijacz morfologiczny 📖";

    header.append(menuContainer, menuTitle);