import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ToolPage from "./components/ToolPage";
import ProcessingPage from "./components/ProcessingPage";
import ReadyPage from "./components/ReadyPage";

export default function App() {
  const [page, setPage] = useState("home");
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar setPage={setPage} />
      {page === "home" && <LandingPage setPage={setPage} />}
      {page === "about" && <AboutPage setPage={setPage} />}
      {page === "tool" && (
        <ToolPage setPage={setPage} fileInputRef={fileInputRef} />
      )}
      {page === "processing" && <ProcessingPage setPage={setPage} />}
      {page === "ready" && <ReadyPage setPage={setPage} />}
    </div>
  );
}
