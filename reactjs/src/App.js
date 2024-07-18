import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Fighter from "./pages/Fighter";
import Dashboard from "./pages/Dashboard";

function App() {
  const [fighters, setFighters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1/`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    const getFighters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/fighters`);
        if (!ignore) {
          if (!response.ok) {
            throw new Error("Failed to fetch fighters");
          }
          const data = await response.json();
          setFighters(data);
        }
      } catch (error) {
        setError(error.message || "Unexpected Error");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    getFighters();

    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fighters/:id" element={<Fighter />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

