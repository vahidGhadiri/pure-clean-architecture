import js from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import boundaries from "eslint-plugin-boundaries";
import nava from "@whydrf/eslint-plugin-nava";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

const projectAliasPattern =
  "^@(assets(?:/illustrations)?|shared|adapters|features|infrastructure|components|services|configs|domain|utils|hooks)(?:/.*)?$";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs["flat/recommended"],
  {
    rules: {
      ...perfectionist.configs["recommended-line-length"].rules,
      "boundaries/element-types": [
        "error",
        {
          rules: [
            { from: "shared-kernel", allow: [] },
            { from: "shared-contracts", allow: ["shared-kernel"] },
            {
              allow: ["shared-contracts", "shared-kernel"],
              from: "shared-infrastructure",
            },
            { allow: ["shared-kernel"], from: "module-domain" },
            {
              allow: ["module-domain", "shared-kernel"],
              from: "module-application",
            },
            {
              allow: ["module-domain", "shared-contracts", "shared-kernel"],
              from: "module-infrastructure",
            },
            {
              allow: ["module-application", "module-infrastructure", "shared-kernel"],
              from: "module-provider",
            },
            {
              allow: ["module-application", "module-provider", "shared-contracts", "shared-kernel"],
              from: "module-api",
            },
            {
              allow: ["module-api", "shared-kernel"],
              from: "feature",
            },
          ],
          default: "disallow",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: [
            { elementNamePattern: projectAliasPattern, groupName: "alias" },
            { elementNamePattern: "^src/", groupName: "sibling" },
          ],
          groups: [["builtin", "external"], ["alias"], ["parent", "sibling", "index"], "unknown"],
          fallbackSort: { type: "alphabetical", order: "asc" },
          type: "line-length",
          newlinesBetween: 1,
          order: "desc",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports", prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "nava/multiline-type-literals": "error",
      "nava/no-inline-type-imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "nava/module-member-order": "error",
      "perfectionist/sort-modules": "off",
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "react/prop-types": "off",
    },
    settings: {
      "boundaries/elements": [
        { pattern: "src/shared/kernel/*", type: "shared-kernel" },
        { pattern: "src/shared/contracts/*", type: "shared-contracts" },
        { pattern: "src/shared/infrastructure/*", type: "shared-infrastructure" },
        { pattern: "src/modules/*/domain/*", type: "module-domain" },
        { pattern: "src/modules/*/application/*", type: "module-application" },
        { pattern: "src/modules/*/infrastructure/*", type: "module-infrastructure" },
        { pattern: "src/modules/*/*.provider.ts", type: "module-provider" },
        { pattern: "src/modules/*/index.ts", type: "module-api" },
        { pattern: "src/features/*", type: "feature" },
      ],
      react: { version: "detect" },
    },
    languageOptions: {
      globals: {
        AbortController: "readonly",
        URLSearchParams: "readonly",
        sessionStorage: "readonly",
        clearInterval: "readonly",
        clearTimeout: "readonly",
        localStorage: "readonly",
        setInterval: "readonly",
        setTimeout: "readonly",
        navigator: "readonly",
        document: "readonly",
        console: "readonly",
        window: "readonly",
        fetch: "readonly",
        URL: "readonly",
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      parser: tseslint.parser,
    },
    plugins: {
      "react-hooks": reactHooks,
      react,
      perfectionist,
      boundaries,
      prettier,
      nava,
    },
    files: ["src/**/*.{ts,tsx}"],
  },
  { ignores: ["dist/"] },
);
