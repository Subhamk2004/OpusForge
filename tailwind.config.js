/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p: "#F7F7F9",
        s: "#EDEDF3",
        cardbg: "#fefefe",
        purple: "#C8BBF0",
        yellow: "#EAFD75",
        textp: "#2D2D2D",
        texts: "#6B6B6B",
        light: "#ffffff",
        "border-light": "#E0E0E0",
        "shadow-color": "rgba(0, 0, 0, 0.08)",
        hoverbg: "#B1A2E3",
        inputbg: "#F1F1F6",
        errorbg: "#ffc3c3",
        error: "#710909",
      },
      boxShadow: {
        soft: "7px 7px 28px rgba(0, 0, 0, 0.06)",
        medium: "0 6px 18px rgba(0, 0, 0, 0.08)",
        hard: "3px 8px 18px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
