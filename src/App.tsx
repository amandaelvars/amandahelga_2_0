import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onReady = () => setTimeout(() => setIsLoaded(true), 150);
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  return (
    <>
      {/* Loader overlay */}
      <Loader visible={!isLoaded} />

      {/* Page content fades in */}
      <div
        className={`${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        aria-hidden={!isLoaded}
      >
        <Navbar />

        {/* keep a consistent dark background site-wide */}
        <main className="bg-neutral-950 text-gray-100 min-h-[calc(100vh-3.5rem)]">
          <Routes>
            {/* Home (three-image layout) */}
            <Route path="/" element={<Home />} />

            {/* Resume page */}
            <Route path="/resume" element={<Resume />} />

            {/* Portfolio page */}
            <Route path="/portfolio" element={<Portfolio />} />

            {/* Contact page */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}
