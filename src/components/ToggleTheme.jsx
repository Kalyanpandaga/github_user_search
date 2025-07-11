import { useEffect, useState } from "react";

export default function ToggleTheme() {
  // Determine initial theme: localStorage > system preference
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    if (localStorage.theme === "dark") return true;
    if (localStorage.theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [dark, setDark] = useState(getInitialTheme);

  // Apply or remove .dark class and update localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      html.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  // Listen to system theme change if user has no manual preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!("theme" in localStorage)) {
        setDark(e.matches);
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", handler);
    } else {
      media.addListener(handler); // Safari fallback
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handler);
      } else {
        media.removeListener(handler);
      }
    };
  }, []);

  return (
    <button
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      onClick={() => setDark((prev) => !prev)}
      aria-label="Toggle dark mode"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
