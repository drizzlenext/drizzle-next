"use client";

import hljs from "highlight.js";
import { useEffect } from "react";

export function ComponentCode({
  code,
  language,
  title,
}: {
  code: string;
  language: string;
  title: string;
}) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-3xl">{title}</h2>
      <pre className="rounded">
        <div className="relative">
          <button
            onClick={(event) => {
              navigator.clipboard.writeText(code);
              const button = event.target as HTMLButtonElement;
              const originalText = button.textContent;
              button.textContent = "Copied";
              setTimeout(() => {
                button.textContent = originalText;
              }, 3000);
            }}
            className="absolute top-0 right-0 mt-2 mr-2 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Copy
          </button>
        </div>
        <code className={`language-${language} rounded`}>{code}</code>
      </pre>
    </div>
  );
}
