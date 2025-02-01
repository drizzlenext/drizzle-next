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
      <h2 className="text-3xl font-bold">{title}</h2>
      <pre className="rounded">
        <code className={`language-${language} rounded`}>{code}</code>
      </pre>
    </div>
  );
}
