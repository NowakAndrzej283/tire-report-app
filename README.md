# 🚗 Aplikacja raportu opon (Tire Report App)

Aplikacja webowa napisana w React + TypeScript służąca do tworzenia raportów stanu opon pojazdu.
---

## ✨ Funkcjonalności

- Formularz danych pojazdu (marka, model, VIN, email-opcjonalne)
- Szczegółowa ocena 4 kół (przód/tył, lewo/prawo)
- Dane dla każdej opony:
  - marka opony
  - rozmiar
  - głębokość bieżnika (mm)
  - DOT (kod produkcji)
  - ocena (1–5)
  - notatki
- Walidacja danych wejściowych
- Maskowany input DOT (formatowanie podczas wpisywania)
- Ostrzeżenia o zużyciu opon (bez blokowania formularza)
- Integracja z Supabase (gotowa do produkcji)

---

## 🧠 Kluczowe decyzje projektowe

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

## 🛠 Stack technologiczny

- React
- TypeScript
- Vite
- Supabase (in-progress)
- CSS (custom styling)

---

## 📦 Instalacja

```bash id="inst1"
bun install
