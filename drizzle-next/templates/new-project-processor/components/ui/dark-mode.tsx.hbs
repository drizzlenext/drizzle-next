"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import * as React from "react";
import { Button } from "./button";

const script = /*js*/ `
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
`;

export function DarkModeScript() {
  const isServerInserted = React.useRef(false);

  useServerInsertedHTML(() => {
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return (
        <script
          dangerouslySetInnerHTML={ {
            __html: script,
          } }
        />
      );
    }
  });

  return null;
}

type Theme = "dark" | "light" | undefined;

export function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>();

  function setDark() {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }

  function setLight() {
    setTheme("light");
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (storedTheme === "dark") {
      setDark();
    } else if (storedTheme === "light") {
      setLight();
    } else if (prefersDark) {
      setDark();
    } else {
      setLight();
    }
  }, []);

  function handleClick() {
    if (theme === "dark") {
      setLight();
    } else {
      setDark();
    }
  }

  return (
    <Button onClick={handleClick} size="icon" variant="ghost">
      <SunIcon className="block dark:hidden" />
      <MoonIcon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
