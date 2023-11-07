/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#1f2937",
              foreground: "#caced4",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#fff",
              foreground: "#000",
            },
          },
        },
      },
    }),
  ],
};
