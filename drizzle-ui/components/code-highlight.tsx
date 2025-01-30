"use client";

import hljs from "highlight.js";
import { useEffect } from "react";

export function CodeHighlight() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
}
