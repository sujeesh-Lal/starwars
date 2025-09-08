# Star Wars Characters Explorer

## 📖 Project Overview

Star Wars Characters Explorer is a **React + TypeScript** application to browse characters from the Star Wars universe.

- List all characters with **name, gender, and home planet**.
- Search characters by name (Client-side filtering, providing quick results by searching cached data.).
- View character details including **films and starships**.
- Maintain a **favourites list** of characters.
- Responsive design with **PrimeReact UI components**.

### 📝 Notes

- **This project is a Single Page Application (SPA). Direct navigation to nested routes is not currently supported but can be enabled in future iterations with additional development.**
- **The Edit feature is not yet available. Both the Edit and View buttons currently redirect to the Details page, where users can add or remove characters from the Favorites list.**

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

## 📂 Project Structure

- **`src/`** – Global application setup
  - **`app/`** – app folder
    - **`store.ts`** – Configures the Redux store
    - **`rootReducer.ts`** – Combines all feature slices

  - **`assets/`** – Static assests
    - **`fonts`** – Font files
    - **`images`** – images, svg etc

  - **`modules(home)/`** – Feature-based modules for better separation of concerns. In this case its home module
    - **`components/`** – Generic components for this module
    - **`pages/`** – Container components which acts as route
    - **`services/`** – Request utilities and shared functions for particular module
    - **`slice/`** – State, reducers, and actions for module for particular module
    - **`hooks/`** – Typed Redux hooks for safer, cleaner code for particular module

  - **`layouts/`** – Generic layout structures like header, footer etc

  - **`shared/`** – Globally shared section
    - **`components/`** – Generic components for this app
    - **`services/`** – Global request utilities and shared functions
    - **`types/`** – Global type definitions
    - **`hooks/`** – Typed Redux hooks for safer, cleaner code for app

  - **`styles/`** – Global styles, themes, typography, variables etc

This layout makes it clear **where logic lives**, keeps related files close together, and supports **scalability** as your project grows.

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

## 🧹 Code Formatting with Prettier

This project uses **[Prettier](https://prettier.io/)** to enforce a consistent code style across the codebase.

The configuration file lives at the root of the project:

```bash
.prettierrc
```

Code can be formatted using the command

```bash
npm run format
```

## 🚀 CI/CD & Deployment

### 🔄 GitHub Actions (Continuous Integration)

This project includes a GitHub Actions workflow to automatically:

- Install dependencies
- Run tests
- Build the production bundle

The workflow triggers on:

- Every pull request to `main`
- Every push to `main`

Key workflow steps:

1. **Checkout code** – pulls the latest repository contents
2. **Install dependencies** – uses a cached `node_modules` for faster builds
3. **Run tests** – executes unit with Jest
4. **Build** – compiles the React + Vite app for production

The workflow file lives at:  
`.github/workflows/main.yml`

---

### 🌐 Deployment

The project is deployed automatically after a successful build on `main`.

- **Hosting** – [Github Starwars](https://sujeesh-lal.github.io/starwars/)
- **Branch** – Deployments are triggered from the `main` branch
- **Build Command** – `npm run build`
- **Output Directory** – `dist/`

The project can be viewed https://sujeesh-lal.github.io/starwars/
