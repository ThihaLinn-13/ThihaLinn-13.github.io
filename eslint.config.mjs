import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    // Bklit UI chart primitives are vendored registry code (linted with Biome upstream)
    files: ["src/components/charts/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
