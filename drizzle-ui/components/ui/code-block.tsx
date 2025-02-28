"use client";

import hljs, { HighlightResult } from "highlight.js";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import "highlight.js/styles/github-dark.css";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [highlightedCode, setHighlightedCode] = useState<HighlightResult>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHighlightedCode(hljs.highlight(code, { language: language }));
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative text-white dark:bg-zinc-800">
      <pre className="overflow-auto p-3">
        {highlightedCode?.value && (
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode?.value }}
          ></code>
        )}
      </pre>
      <Button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-white hover:bg-zinc-700"
        variant="ghost"
        size="icon"
      >
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
