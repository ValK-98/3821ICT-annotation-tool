import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import logo from "./assets/thumbnail_image.jpg";

export default function App() {
  const [page, setPage] = useState("home");

  const Navbar = () => (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <button
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
          onClick={() => setPage("home")}
        >
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-xl font-semibold text-gray-900">
              Annotation Tool
            </span>
            <span className="text-xs text-gray-500">Cybella</span>
          </div>
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#eleven" className="hover:text-gray-900 cursor-pointer">
            Eleven
          </a>
          <a href="#twelve" className="hover:text-gray-900 cursor-pointer">
            Twelve
          </a>
          <a href="#thirteen" className="hover:text-gray-900 cursor-pointer">
            Thirteen
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
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

  // Landing (home) page
  const LandingPage = () => (
    <section className="mx-auto max-w-screen-xl flex flex-col items-center py-20 px-4 text-center min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold leading-tight md:text-5xl">
        Purus sagittis fringilla arcu neque.
      </h1>
      <p className="mt-4 text-base text-gray-600 md:text-2xl">
        Bibendum amet at molestie mattis.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Button
          className="px-6 py-6 text-base font-medium cursor-pointer"
          onClick={() => setPage("tool")}
        >
          Use The Tool
        </Button>
        <Button
          variant="outline"
          className="px-6 py-6 text-base font-medium cursor-pointer"
        >
          About Us
        </Button>
      </div>
      <div className="mt-16 w-full max-w-2xl aspect-video rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
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

  // Tool page with upload and tutorial cards
  const ToolPage = () => (
    <section className="mx-auto max-w-screen-xl flex flex-col items-center py-20 px-4 min-h-[calc(100vh-64px)]">
      <div className="grid gap-8 w-full md:grid-cols-2">
        {/* Upload card */}
        <div className="border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col">
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-t-lg p-8">
            <svg
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-gray-300"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
              <line x1="8" y1="8" x2="16" y2="16" />
              <line x1="16" y1="8" x2="8" y2="16" />
            </svg>
          </div>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Upload Your Video</h2>
            <p className="text-sm text-gray-600">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button className="flex-1 cursor-pointer">Upload File</Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => setPage("home")}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>

        {/* Tutorial card */}
        <div className="border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col">
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-t-lg p-8">
            <svg
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-gray-300"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
              <polygon points="10,8 16,12 10,16" />
            </svg>
          </div>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">How To Use Tutorial</h2>
            <p className="text-sm text-gray-600">
              Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {page === "home" ? <LandingPage /> : <ToolPage />}
    </div>
  );
}
