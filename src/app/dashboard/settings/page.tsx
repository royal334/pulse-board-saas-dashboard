"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Monitor, Loader2 } from "lucide-react";

type ThemeValue = "light" | "dark" | "system";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme ?? "system") as ThemeValue;
  const displayTheme = resolvedTheme ?? currentTheme;

  const options: { value: ThemeValue; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun className="size-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
    { value: "system", label: "System", icon: <Monitor className="size-4" /> },
  ];

  return (
    <div className="bg-[#E5E5E5] dark:bg-slate-900 md:w-[calc(100vw-17rem)] w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-2 md:m-5 mt-0 pt-5 pr-2">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Settings
        </h1>
      </div>

      <div className="mx-2 md:mx-5 mt-5 mb-5 space-y-6">
        <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Appearance
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Switch between light and dark mode, or use your system preference.
          </p>

          {!mounted ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm">Loading theme…</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {options.map(({ value, label, icon }) => (
                <Button
                  key={value}
                  type="button"
                  variant={currentTheme === value ? "default" : "outline"}
                  className={
                    currentTheme === value
                      ? "bg-purple hover:bg-purple/90 text-white"
                      : ""
                  }
                  onClick={() => setTheme(value)}
                >
                  {icon}
                  {label}
                </Button>
              ))}
            </div>
          )}

          {mounted && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Current: {displayTheme}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
