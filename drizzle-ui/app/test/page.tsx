"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] md:grid-cols-[16rem_1fr]">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-100 p-4 shadow-md md:col-span-2">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Header</h1>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-gray-800 p-4 text-white transition-transform md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-4 top-4 text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4 space-y-2">
          <li className="p-2 hover:bg-gray-700">Item 1</li>
          <li className="p-2 hover:bg-gray-700">Item 2</li>
          <li className="p-2 hover:bg-gray-700">Item 3</li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="p-4">Main Content</main>
    </div>
  );
}
