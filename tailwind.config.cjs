/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "node_modules/preline/dist/*.js",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("preline/plugin")
  ],
};
