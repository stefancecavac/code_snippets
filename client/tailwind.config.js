module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the paths as needed
    "./public/index.html", // Include other paths where dynamic classes might be used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
