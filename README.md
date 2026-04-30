# 🚗 Aplikacja raportu stanu opon (Tire Report App)

Aplikacja webowa napisana w React + TypeScript służąca do tworzenia raportów stanu opon pojazdu.
---

## ✨ Funkcjonalności

- Formularz danych pojazdu (marka, model, VIN, email-opcjonalne)
- Szczegółowa ocena 4 kół (przód/tył, lewo/prawo)
- Dane dla każdej opony:
  - marka opony
  - rozmiar (np. 205/55 R16)
  - głębokość bieżnika (mm)
  - DOT (kod produkcji)
  - ocena (1–5)
  - uwagi (opcjonalne)
- Walidacja danych wejściowych
- Ostrzeżenia o zużyciu opon (bez blokowania formularza)
- Integracja z Supabase
- Informacja o przesłaniu formularza lub informacja o błędzie

---


## 🛠 Stack technologiczny 

- React + TypeScript - zapewniają skalowalność, typowanie danych oraz mniejszą ilość błędów w formularzach
- Vite - szybki build i lekki development server
- Supabase - szybka integracja z bazą danych
- CSS (custom styling) - pełna kontrola nad wyglądem formularza
- bun - szybki package manager w porównaniu do npm

---

## 🔒 Bezpieczeństwo
- Po stronie frontendu występuje walidacja danych (określona w pliku validation.ts) dla takich pól jak : (m.in VIN, DOT, Rozmiar Opony, Grubość Bieżnika),
- Dodatkowa kontrola wprowadzanych danych dzięki elementowi HTML "form", który dla wymaganych elementów blokuje przesłanie formularza oraz wskazuje pole do uzupełnienia,
- Brak przechowywania wrażliwych dancyh w Supabase t.j danych osobowych (wyjątkiem jest opcjonalny email),

---

## 🧠 Decyzje techniczne

### Struktura danych
```bash 
├── components/
│   └── LoadingOverlay.tsx
│   └── PopupModal.tsx
│   └── VehicleDetailsForm.tsx
│   └── WheelForm.tsx
├── lib/
└── supabase.ts
├── utils/
└── validation.ts
├── types.ts
├── App.tsx
```

#### Components
Folder zawiera takie pliki jak: komponent ładowania, popup(informacja na ekranie o powodzeniu lub błędzie formularza), komponent związany z VIN, Marką, Modelem, Emailem oraz 
komponent opisujący stan opon.

#### Lib
Folder z plikiem do integracji Supabase z projektem.

#### Utils
Folder zawierający plik z implementacją walidacji danych (walidacja regex).

#### types.ts
Zawiera typy wykorzystywane w aplikacji.

#### App.tsx
Główny plik aplikacji.

---  
### Budowa formularza
- Formularz oparty jest o kontrolowane komponenty React

---
### Interfejs formularza
- Prosty interfejs skupiony na czytelności danych

---
### 🔹 DOT (kod produkcji opony)
- Format: `DOT - XXXXXXXX - YYYY`
- Automatyczne formatowanie podczas wpisywania
- Dane w stanie przechowywane są w formie RAW (bez formatowania)
- Walidacja oparta o realną strukturę DOT:
  - 8 znaków (kod fabryki i produkcji)
  - 4 cyfry (tydzień i rok produkcji)

---
### 🔹 Głębokość bieżnika
- ≤ 1.6 mm → stan krytyczny (czerwone ostrzeżenie)
- ≤ 3 mm → ostrzeżenie (pomarańczowe)
- > 3 mm → stan prawidłowy

Ostrzeżenia NIE blokują wysłania formularza — są tylko informacją dla użytkownika.

---

### 🔹 VIN 
- Format: `XXX XXX XXX XXXXXXXX`
- Automatyczne formatowanie podczas wpisywania
- Walidacja oparta o standard ISO 3779 (17 znaków z wyłączeniem I, 0, Q)
- W przypadku braku podania VINu przycisk wysłania formularza jest wyłączony

---

### 🔹 Rozmiar 
- Format: `XXX/XX RXX`
- Automatyczne formatowanie podczas wpisywania
- W przypadku braku podania pojawia się błąd 

---

## Przesłanie Formularza
Podczas poprawnego wprowadzenia danych oraz wysłania formularza w supabase zapisuje się jeden obiekt z zagnieżdzonymi danymi czterech opon (zwiększa to spójność)

## Wersja na produkcje
Jeśli aplikacja miała by wejść na produkcje dodałbym autoryzacje użytkowników oraz przypisywanie raportów do kont. Dodatkowo zoptymalizowałbym
aplikacje pod względem autosave-ów formularza.

## Świadome uproszczenia
- supabase jako szybkie rozwiązanie
- minimalistyczny UI
- zapis w supabase jako jeden obiekt, w którym jest jsonb z danymi o oponach (lepiej byłoby rozdzielić na dwie tablice)

## Link do działającej strony 
https://nowakandrzej283.github.io/tire-report-app/

