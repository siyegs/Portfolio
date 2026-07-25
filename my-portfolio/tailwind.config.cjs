/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* The two families the site already loads, promoted to tokens so pages
         stop hand-writing `style={{ fontFamily: "..." }}` on every element. */
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        display: [
          '"Special Gothic Expanded One"',
          '"Space Grotesk"',
          "system-ui",
          "sans-serif",
        ],
      },

      colors: {
        ink: "#18181b", // dark canvas
        paper: "#f3f2f9", // light canvas
        accent: "#aab2d1", // periwinkle, the dark theme's accent
        "accent-warm": "#90754c", // its warm counterpart on the light theme
      },

      /* One editorial size ramp for oversized display type. Line heights are
         deliberately tight: this face is wide, so it needs the density. */
      fontSize: {
        "display-xl": ["clamp(3.5rem, 17vw, 15rem)", { lineHeight: "0.82" }],
        "display-lg": ["clamp(2rem, 6.4vw, 5rem)", { lineHeight: "0.9" }],
        "display-md": ["clamp(1.5rem, 3.4vw, 2.75rem)", { lineHeight: "0.95" }],
      },

      maxWidth: {
        shell: "1440px",
        read: "62ch",
      },

      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
