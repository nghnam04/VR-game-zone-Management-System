export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "1px",
      },
    },
  },
  plugins: [],
};
