"use client";
import { useModeStore } from "@/app/store/useModeStore";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { AngelIcon, DevilIcon } from "./header-icons";

export function TopHeader() {
  const { isRudeMode, toggleMode } = useModeStore();

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("theme-rude", "theme-polite");

    if (isRudeMode) {
      root.classList.add("theme-rude");
    } else {
      root.classList.add("theme-polite");
    }

    return () => {
      root.classList.remove("theme-rude", "theme-polite");
    };
  }, [isRudeMode]);

  return (
    <header className="grid grid-cols-3 items-center p-4 border-b border-border transition-colors duration-500">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl hidden sm:block truncate">
          Meansure - Bad words calculator
        </h1>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={toggleMode}
          variant="ghost"
          className="w-14 h-14 rounded-full p-0 hover:bg-black/5 dark:hover:bg-white/10 transition-transform active:scale-95"
        >
          {isRudeMode ? (
            <DevilIcon className="!w-12 !h-12 drop-shadow-md" />
          ) : (
            <AngelIcon className="!w-12 !h-12 drop-shadow-md" />
          )}
        </Button>
      </div>

      <div className="flex justify-end">
        <SidebarTrigger />
      </div>
    </header>
  );
}
