export const getTheme = () => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      return "light";
    } else {
      return "dark";
    }
  }
};
