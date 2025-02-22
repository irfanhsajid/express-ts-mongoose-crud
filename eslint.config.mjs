import globals from "globals";
import pluginJs from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/", "node_modules/"], // Add ignored paths here
    files: ["src/**/*.{js,mjs,cjs,ts}"], // Lint only files in the 'src' directory
    languageOptions: {
      parser: typescriptParser, // Use TypeScript parser
      ecmaVersion: "latest", // Latest ECMAScript version
      sourceType: "module", // Use ES modules
      globals: globals.browser, // Browser globals
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin, // Correctly define plugins as an object
    },
    rules: {
      eqeqeq: "off", // Disable === enforcement
      "no-unused-vars": "error", // Enforce no unused variables
      "no-console": "warn", // Warn on console usage
      "no-undef": "error", // Enforce no undefined variables
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }], // Prefer const over let/var
      ...typescriptPlugin.configs.recommended.rules, // Include recommended TypeScript rules
    },
  },
  pluginJs.configs.recommended, // Include recommended JS rules
];
