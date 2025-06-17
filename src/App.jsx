import { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home/Home";
import { HashLoader } from "react-spinners";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import ClickSpark from "./animations/Animations/ClickSpark/ClickSpark";
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./pages/404 Error/Error";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar loading={loading} />
          <Home loading={loading} />
          <Footer />
        </>
      ),
      errorElement: (
        <>
          <Navbar loading={loading} />
          <Error loading={loading} />
        </>
      ),
    },
  ]);

  const handleLoad = useCallback(() => {
    const MIN_LOAD_TIME = 2000;
    const start = Date.now();

    // Fallback in case load never fires (e.g., incognito, font block)
    const failSafe = setTimeout(() => {
      setLoading(false);
    }, MIN_LOAD_TIME + 1000); // 1s buffer beyond MIN_LOAD_TIME

    const onLoad = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(MIN_LOAD_TIME - elapsed, 0);

      clearTimeout(failSafe); // Clear fallback if load works
      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(failSafe);
    };
  }, []);

  useEffect(() => {
    const cleanupLoadEvent = handleLoad();
    return cleanupLoadEvent;
  }, [handleLoad]);

  // Lenis smooth scrolling setup
  useEffect(() => {
    if (loading) return;

    const scrollContainer = document.querySelector(".app-wrapper");
    if (!scrollContainer) return;

    const lenis = new Lenis({
      duration: 3,
      smooth: true,
      wrapper: scrollContainer,
      content: scrollContainer.firstElementChild,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on component unmount
  }, [loading]);

  return (
    <div className="app-wrapper" style={{ height: "100vh", overflowY: "auto" }}>
      {/* Loader */}
      <div className={`loader-container ${loading ? "visible" : "hidden"}`}>
        <HashLoader color="#096b68" size={120} />
      </div>

      {/* Page content */}
      <div className={`page-content ${loading ? "hidden" : "visible"}`}>
        <ClickSpark
          sparkColor="#096b68"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={200}
        >
          <div className="main-container">
            <RouterProvider router={router} />
          </div>
        </ClickSpark>
      </div>
    </div>
  );
}

export default App;
