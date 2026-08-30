import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/theme.store";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-10 h-10 flex items-center justify-center rounded-md border border-white/12 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5 transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
