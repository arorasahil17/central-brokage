import { useState, useEffect } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export default function Toggle() {
  // Set initial theme based on local storage or default to dark mode
  const initialTheme = localStorage.getItem("theme") || "dark";
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === "dark");

  // Function to toggle theme
  function handleDarkMode() {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the theme to local storage
    localStorage.setItem("theme", newTheme);
  }

  // Set the initial theme class when the component mounts
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={handleDarkMode}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
