"use client";

import { ReactNode, useEffect } from "react";

export function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;

      // Avoid duplicate buttons
      if (pre.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "copy-btn absolute top-2 right-2 bg-white text-black p-1 rounded hover:bg-gray-200 text-sm";

      button.onclick = async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 2000);
      };

      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, []);

  return (
    <div className="grid h-screen grid-cols-[36px_1fr] grid-rows-[auto_1fr] sm:grid-cols-[180px_1fr]">
      {children}
    </div>
  );
}
