import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type User = { name: string; email: string; avatar?: string } | null;

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  user: User;
  setUser: (u: User) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  water: number;
  setWater: (n: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<User>({ name: "Alex Morgan", email: "alex@nourish.app" });
  const [favorites, setFavorites] = useState<string[]>(["r1", "r3"]);
  const [bookmarks, setBookmarks] = useState<string[]>(["r2"]);
  const [water, setWater] = useState<number>(5);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleFavorite = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const toggleBookmark = (id: string) =>
    setBookmarks((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, favorites, toggleFavorite, bookmarks, toggleBookmark, water, setWater }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
