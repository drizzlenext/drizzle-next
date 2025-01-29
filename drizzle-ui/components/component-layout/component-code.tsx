"use client";

import hljs from "highlight.js";
import { useEffect } from "react";
import { Button } from "../ui/button";

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
      <h2 className="text-3xl font-bold">{title}</h2>
      <pre className="rounded">
        <div className="relative">
          <Button
            onClick={(event) => {
              navigator.clipboard.writeText(code);
              const button = event.target as HTMLButtonElement;
              const originalText = button.textContent;
              button.textContent = "Copied";
              setTimeout(() => {
                button.textContent = originalText;
              }, 3000);
            }}
            className="absolute right-0 top-0 mr-2 mt-2"
          >
            Copy
          </Button>
        </div>
        <code className={`language-${language} rounded`}>{code}</code>
      </pre>
    </div>
  );
}
