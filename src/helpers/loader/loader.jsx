import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./loader.css";

function Loader({ isVisible }) {
  return (
    <div className={`loader ${isVisible ? "active" : "fade-out"}`} id="loader">
      <div className="spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
}

function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 50);
    return () => clearTimeout(timer);
  }, [location]);

  return <Loader isVisible={loading} />;
}


export default PageLoader;
