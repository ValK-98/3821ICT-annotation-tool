import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "../assets/thumbnail_image.jpg";

export default function Navbar({ setPage }) {
  return (
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
          </div>
        </button>

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
}
