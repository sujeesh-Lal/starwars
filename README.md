# Star Wars Characters Explorer

## 📖 Project Overview

Star Wars Characters Explorer is a **React + TypeScript** application to browse characters from the Star Wars universe.

- Browse all characters with **name, gender, and home planet**.
- Search characters by name (Client-side filtering, providing quick results by searching cached data.).
- View character details including **films and starships**.
- Maintain a **favourites list** of characters.
- Responsive design with **PrimeReact UI components**.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Library:** PrimeReact, Tailwind CSS
- **State Management:** Redux
- **HTTP Requests:** Axios
- **Testing:** Jest (unit tests), Cypress (E2E tests)

---

## 🌐 APIs Used

| Resource  | Endpoint                                                          |
| --------- | ----------------------------------------------------------------- |
| Planets   | `https://www.swapi.tech/api/planets?page=1&limit=100`             |
| People    | `https://www.swapi.tech/api/people?page=2&limit=10&expanded=true` |
| Films     | `https://www.swapi.tech/api/films/1`                              |
| Starships | `https://www.swapi.tech/api/starships/1`                          |

---

## ✨ Features

[![Features](https://img.shields.io/badge/-Features-blue)](#features)

### Character List

- Display all characters with **name, gender, home planet**
- **Pagination controls** for navigation
- **Client-side search** to filter characters
- Click a character to view **details page**

### Character Details

- Display **name, hair color, eye color, gender, home planet**
- List **films** and **starships**
- Add character to **favourites**

### Favourites

- View all **favourite characters** with **name, height, gender, home planet**
- Remove characters from the list

---

## ⚡ Installation

[![Installation](https://img.shields.io/badge/-Installation-green)](#installation)

1. **Clone the repository:**

```bash
git clone https://github.com/sujeesh-Lal/starwars.git
cd starwars
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

Open http://localhost:5173/starwars/ in your browser to view the app.

4. **Build for production:**

```bash
npm run build
```

## 🧪 Testing

[![Testing](https://img.shields.io/badge/-Testing-orange)](#testing)

### Unit Tests (Jest)

Run all unit tests using Jest:

```bash
npm run test
```

## 🧪 End-to-End (E2E) Testing

[![E2E Testing](https://img.shields.io/badge/-E2E%20Testing-orange)](#e2e-testing)

This project uses **Cypress** for end-to-end testing.

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```
