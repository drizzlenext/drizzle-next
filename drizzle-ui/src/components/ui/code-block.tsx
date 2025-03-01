"use client";

import hljs, { HighlightResult } from "highlight.js";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";

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
    <div className="relative text-white">
      <pre className="overflow-auto">
        {highlightedCode?.value && (
          <code
            className={`language-${language} hljs`}
            dangerouslySetInnerHTML={{ __html: highlightedCode?.value }}
          ></code>
        )}
      </pre>
      <Button
        onClick={handleCopy}
        className="absolute top-0 right-0 text-white hover:bg-transparent"
        variant="ghost"
        size="icon"
      >
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
