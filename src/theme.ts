// src/theme.ts
const setTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const savedTheme = localStorage.getItem("theme");
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (userPrefersDark) {
  setTheme("dark");
} else {
  setTheme("light");
}

window.toggleTheme = () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
};

// window.toggleTheme = () => {
//   const currentTheme = localStorage.getItem("@key:theme");
//   const newTheme = currentTheme === "dark" ? "light" : "dark";
//   localStorage.setItem("@key:theme", newTheme);
//   document.documentElement.setAttribute("data-theme", newTheme);
// };

export { setTheme };
