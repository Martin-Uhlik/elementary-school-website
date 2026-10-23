import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // turns off ESLint rules that would fight with Prettier
  prettier,
  {
    rules: {
      // the ported pages keep plain <img> so they render exactly like the old site
      "@next/next/no-img-element": "off",
      // ported Czech text uses plain quotes
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // legacy static files copied from html/
    "public/**",
  ]),
]);

export default eslintConfig;
