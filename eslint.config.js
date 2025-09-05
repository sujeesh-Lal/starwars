import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import path from "path";

export default tseslint.config([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", path.resolve(__dirname, "src")],
            ["@home", path.resolve(__dirname, "src/home")],
            ["@app", path.resolve(__dirname, "src/app")],
            ["@layouts", path.resolve(__dirname, "src/layouts")],
            ["@shared", path.resolve(__dirname, "src/shared")],
            ["@styles", path.resolve(__dirname, "src/styles")],
            ["@utils", path.resolve(__dirname, "src/utils")],
            ["@styles", path.resolve(__dirname, "src/styles")],
          ],
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      "prettier/prettier": "error", // 👈 enforce Prettier
    },
  },
  eslintConfigPrettier,
]);
