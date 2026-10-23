import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // full accessibility rule set (next only enables a few jsx-a11y rules; the plugin itself is registered by next)
  { rules: jsxA11y.flatConfigs.strict.rules },
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
