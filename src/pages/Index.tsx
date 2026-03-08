import { useState, useEffect, lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
const BackgroundCanvas = lazy(() => import("@/components/BackgroundCanvas"));
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Services from "@/sections/Services";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [darkMode]);

  return (
    <div>
      {/* Global subtle 3D background — fixed, behind all content */}
      <Suspense fallback={null}>
        <BackgroundCanvas darkMode={darkMode} />
      </Suspense>

      <Preloader />
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
