import React from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage({ setPage }) {
  return (
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
          onClick={() => setPage("about")}
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
}
