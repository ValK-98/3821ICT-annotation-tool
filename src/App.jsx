import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "./assets/thumbnail_image.jpg";

function Navbar() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        {/* Left: Logo */}
        <a
          href="#"
          className="text-xl font-semibold text-gray-900 flex items-center gap-2"
        >
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          Annotation Tool
        </a>

        {/* Right: Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#eleven" className="hover:text-gray-900">
            Eleven
          </a>
          <a href="#twelve" className="hover:text-gray-900">
            Twelve
          </a>
          <a href="#thirteen" className="hover:text-gray-900">
            Thirteen
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 hover:text-gray-900">
                Sixteen
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Option A</DropdownMenuItem>
              <DropdownMenuItem>Option B</DropdownMenuItem>
              <DropdownMenuItem>Option C</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-screen-xl flex flex-col items-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold leading-tight md:text-5xl">
        Purus sagittis fringilla arcu neque.
      </h1>
      <p className="mt-4 text-base text-gray-600 md:text-lg">
        Bibendum amet at molestie mattis.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Button className="px-6 py-6 text-base font-medium">
          Use The Tool
        </Button>
        <Button variant="outline" className="px-6 py-6 text-base font-medium">
          About Us
        </Button>
      </div>

      {/* Illustration placeholder */}
      <div className="mt-16 w-full max-w-3xl aspect-video rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
        <svg
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="text-gray-300"
        >
          <polygon points="8,5 19,12 8,19" />
        </svg>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}
