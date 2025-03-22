"use client";

import React, { ReactNode } from "react";

interface ScrollLinkProps {
  href: string;
  children: ReactNode;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ href, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 48,
        behavior: "smooth",
      });
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ScrollLink;
