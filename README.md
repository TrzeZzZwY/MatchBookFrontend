<div align="center"><img src = "https://user-images.githubusercontent.com/31413093/197097625-5b3bd3cf-2bd6-4a3a-8059-a1fe9f28100b.svg" height="100px" alt="My Happy SVG"/></div>

<h2 align="center">Matchbook-vite-react-ts-tailwind</h2>

<div align="center">
<a href="https://reactjs.org/"><image src="https://img.shields.io/static/v1?label=React&message=^18&style=for-the-badge&labelColor=FFFFFF&logo=react&color=61DAFB"/></a> <a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=TypeScript&message=^5&style=for-the-badge&labelColor=FFFFFF&logo=typescript&color=3178C6"/></a> <a href="https://www.typescriptlang.org/"><image src="https://img.shields.io/static/v1?label=Tailwind%20CSS&message=^3&style=for-the-badge&labelColor=FFFFFF&logo=tailwindcss&color=06B6D4"/></a> <a href="https://cn.vitejs.dev/"><image src="https://img.shields.io/static/v1?label=Vite&message=^4&style=for-the-badge&labelColor=FFFFFF&logo=vite&color=646CFF"/></a>
</div>

# Dokumentacja panelu administracyjnego aplikacji Matchbook

## Wprowadzenie

### Opis projektu
Matchbook to aplikacja webowa zbudowana na React (z wykorzystaniem Vite) dla interfejsu użytkownika oraz backendu obsługującego API. Celem systemu jest zapewnienie dynamicznej i responsywnej platformy do zarządzania danymi użytkowników aplikacji mobilnej Matchbook.

### Główne funkcje panelu administracyjnego
- Interfejs użytkownika oparty na React i Vite.
- Integracja z bazą danych i obsługa operacji CRUD.
- Prezentacja statystyk aplikacji.
- Zarządzanie zgłoszeniami i użytkownikami.

## Wymagania systemowe
Aby uruchomić aplikację, wymagane są:
- Node.js w wersji 18.16.1 lub nowszej.
- Menedżer pakietów npm.

## Instalacja
1. Sklonować repozytorium.
2. W katalogu głównym projektu uruchomić:
   ```sh
   npm install
   npm run dev
   ```
3. Otworzyć przeglądarkę i przejść pod adres: `http://localhost:3000`
4. Upewnić się, że backend działa na odpowiednich portach (konfiguracja w `config.json`).

## Logowanie do panelu administracyjnego
- **Adres URL:** `http://localhost:3000/login`
- **Dane logowania administratora:**
  - **Login:** `admin@matchbook.com`
  - **Hasło:** `1qazXSW@`

## Moduły aplikacji

### Statystyki
- Widok `Statistics.tsx` prezentuje kluczowe metryki aplikacji, takie jak liczba użytkowników, książek i zgłoszeń.
- Dane są pobierane z backendu metodami:
  ```typescript
  const booksResponse = await BookService.getBooks();
  setTotalBooks(booksResponse.totalItemsCount);
  ```
- Na dole widoku znajduje się wykres słupkowy:
  ```typescript
  const response = await UserBookItemService.getUserBookItems({
    startDate: date.toISOString(),
    endDate: endDate.toISOString(),
  });
  ```

### Zarządzanie autorami
- Widok `Authors.tsx` pozwala na przeglądanie, dodawanie i edytowanie autorów.
- Struktura plików:
  ```
  |-- Authors.tsx
  |-- services/AuthorsService.tsx
  |-- components/AddAuthorDialog.tsx
  |-- components/EditAuthorDialog.tsx
  ```
- Komunikacja z API realizowana jest poprzez `AuthorsService.tsx`:
  ```typescript
  const authors = await AuthorService.getAuthors({ pageSize: 10, pageNumber: 1 });
  ```

### Zarządzanie książkami
- Widok `Books.tsx` pozwala na zarządzanie katalogiem książek.
- API:
  ```typescript
  getBooks() {
    return RequestService.get('/api/Book');
  }
  ```
- Możliwość edycji i usuwania książek:
  ```typescript
  const deleteBook = async (bookId: number) => {
    await BookService.deleteBook(bookId);
  };
  ```

### Zarządzanie użytkownikami
- Widok `Users.tsx` umożliwia wyszukiwanie, filtrowanie i zarządzanie użytkownikami.
- Pobieranie listy użytkowników:
  ```typescript
  const users = await UserService.getUsers({ statusFilter: 'ACTIVE' });
  ```
- Zmiana statusu użytkownika:
  ```typescript
  await UserService.updateStatus(userId, 'BANNED');
  ```

### Zarządzanie zgłoszeniami (Raporty)
- Widok `CaseActions.tsx` wyświetla zgłoszenia użytkowników.
- Pobieranie zgłoszeń:
  ```typescript
  const cases = await CaseActionService.getCaseActions({ caseStatus: 'OPEN' });
  ```
- Akceptowanie zgłoszenia:
  ```typescript
  await CaseActionService.approveCase(caseId);
  ```

## Interfejs użytkownika
- **Paginacja:** możliwość wyboru liczby elementów na stronę.
- **Filtry:** status użytkownika, status zgłoszenia, kategoria książek.
- **Powiadomienia:** toast informujące o wyniku operacji.

## Obsługa błędów i wyjątków
- W przypadku niepowodzenia zapytań API wyświetlane są komunikaty błędów.
- Nieudane pobranie danych użytkownika zwraca wartość "N/D".
- Brak przypisanego administratora oznaczony jest znakiem "-".

## Podsumowanie
Panel administracyjny aplikacji Matchbook umożliwia efektywne zarządzanie użytkownikami, książkami i zgłoszeniami. Dzięki paginacji, filtrom i powiadomieniom administratorzy mogą sprawnie obsługiwać dane i podejmować decyzje. 

Dokumentacja przedstawia najważniejsze moduły i funkcjonalności systemu, zapewniając kompleksowy przegląd możliwości panelu administracyjnego.

A starter [Vite](https://vitejs.dev/) template by [RoyRao2333](https://github.com/RoyRao2333/template-vite-react-ts-tailwind) has:
- React
- TypeScript
- Vite
- Tailwind CSS
- Multiple eslint & prettier plugins installed
