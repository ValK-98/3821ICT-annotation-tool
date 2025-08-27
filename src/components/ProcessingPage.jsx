import React, { useEffect } from "react";

export default function ProcessingPage({ setPage }) {
  useEffect(() => {
    const t = setTimeout(() => setPage("ready"), 3000);
    return () => clearTimeout(t);
  }, [setPage]);

  return (
    <section className="mx-auto max-w-screen-xl flex flex-col items-center py-24 px-4 text-center min-h-[calc(100vh-64px)]">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="text-gray-300 mb-8"
      >
        <path d="M20 6L9 17l-5-5" strokeWidth="2" />
      </svg>
      <h1 className="text-4xl md:text-5xl font-bold">Thank You</h1>
      <p className="mt-3 text-2xl md:text-3xl font-semibold text-gray-700">
        Video is Processing
      </p>
      <p className="mt-8 max-w-3xl text-gray-600">
        Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit
        nunc in eros scelerisque sed…
      </p>
    </section>
  );
}
