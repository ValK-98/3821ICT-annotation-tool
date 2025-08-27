import React from "react";
import { Button } from "@/components/ui/button";

export default function AboutPage({ setPage }) {
  return (
    <section className="mx-auto max-w-screen-xl py-16 px-4 min-h-[calc(100vh-64px)]">
      <div className="text-center">
        <span className="uppercase text-sm font-semibold text-blue-600 mb-2">
          About Us
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mx-auto max-w-4xl">
        Cybella.AI was founded with a mission to provide accessible, empathetic mental health support to vulnerable youth. 
        </h2>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {[
          "Nibh nullam vitae semper pharetra sit enim id...",
          "Sed et pulvinar donec sed et, nisl dolor amet...",
          "Nunc amet, tempor morbi ligula ut faucibus gravida...",
          "Pellentesque auctor adipiscing lacus viverra...",
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-6">
            <div className="shrink-0">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-muted-foreground/40"
              >
                {i === 0 && <rect x="3" y="4" width="18" height="18" rx="2" />}
                {i === 1 && <rect x="4" y="4" width="16" height="16" rx="8" />}
                {i === 2 && <path d="M3 12h18M6 16h12M9 20h6" />}
                {i === 3 && <rect x="3" y="6" width="18" height="12" rx="2" />}
              </svg>
            </div>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button
          className="px-6 py-6 cursor-pointer"
          onClick={() => setPage("tool")}
        >
          Use The Tool
        </Button>
      </div>
    </section>
  );
}
