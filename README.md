# Szaraki
# 1) Grupy
Hubert Parzych
Łukarz Kazimierczuk
Oliwia Łankiewicz
# 2)Lider
Hubert Parzych
# 3) Nazwa
Szaraki
# 4) Obszar
Nauka Ang. (Słowotwórstwo)
# 5)Github
https://github.com/USomsiadZ/Szaraki

# Dokumentacja
# Rozbijacz Morfologiczny

Aplikacja webowa służąca do nauki języków oraz wizualnej analizy słowotwórczej. Projekt pozwala użytkownikowi wpisać dowolne słowo, które następnie za pomocą sztucznej inteligencji (LLM) jest rozbijane na poszczególne morfemy (prefiksy, rdzeń, sufiksy) i prezentowane w formie dynamicznych, rozsuwających się kulek na ekranie.

Projekt został zrealizowany w ramach przedmiotu **Wprowadzenie do aplikacji WWW**.

---

## Główne Funkcje

* **Morfologiczny Rozbiór Słów:** Integracja z wieloma dostawcami AI w celu dokładnego podziału wyrazów.
* **Dynamiczna Wizualizacja:** Prezentacja morfemów za pomocą animowanych elementów graficznych układających się w okrąg (tryb "Kulek").
* **Historia Wyszukiwań:** Przechowywanie historii zapytań w pamięci przeglądarki (`localStorage`) z zaawansowanymi opcjami sortowania:
    * Najnowsze / Najstarsze
    * Alfabetycznie
    * Ilość morfemów
* **Panel Ustawień:** Elastyczna konfiguracja wyboru dostawcy API (OpenAI, Gemini, Claude, OpenRouter), klucza autoryzacyjnego oraz modelu.
* **Responsywny Design:** Pełna adaptacja interfejsu do ekranów mobilnych, standardowych oraz monitorów Ultra-Wide (media queries).

---

## Architektura Projektu i Struktura Plików

Aplikacja została zbudowana w architekturze modułowej przy użyciu czystego JavaScriptu, gdzie widoki oraz komponenty są generowane dynamicznie za pomocą manipulacji drzewem DOM.

```text
├── index.html            # Główny punkt wejścia aplikacji
├── css/
│   └── styles.css        # Kompletne style CSS
└── js/
    ├── kulki.js          # Główny kontroler aplikacji, zarządzanie zdarzeniami i cyklem życia
    ├── page_header.js    # Moduł dynamicznego nagłówka oraz menu hamburgerowego
    ├── page_main.js      # Kontroler głównej sceny (generowanie kulek, animacje, zapytania API)
    ├── page_history.js   # Zarządzanie historią wyników i zapisem w localStorage
    ├── page_settings.js  # Integracja z formularzem konfiguracji API
    ├── page_about.js     # Widok sekcji "O nas" z informacjami o zespole
    ├── api_openai.js     # Integracja z bramką API OpenAI
    ├── api_gemini.js     # Integracja z bramką API Google Gemini
    ├── api_claude.js     # Integracja z bramką API Anthropic Claude
    └── api_openrouter.js # Integracja z uniwersalną bramką OpenRouter