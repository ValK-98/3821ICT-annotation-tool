import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import logo from "../assets/thumbnail_image.jpg";

export default function Navbar({ setPage }) {
  return (
    <header className="w-full border-b border-border">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <button
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
          onClick={() => setPage("home")}
        >
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-xl font-semibold text-foreground">
              Annotation Tool
            </span>
          </div>
        </button>

        <nav className="flex items-center gap-6 text-sm font-medium text-foreground/80">
          <a href="#eleven" className="hover:text-foreground cursor-pointer">
            Eleven
          </a>
          <a href="#twelve" className="hover:text-foreground cursor-pointer">
            Twelve
          </a>
          <a href="#thirteen" className="hover:text-foreground cursor-pointer">
            Thirteen
          </a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
