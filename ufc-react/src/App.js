import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [fighters, setFighters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1/`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getFighters();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getFighters = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/fighters`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setFighters(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fighters</h1>
        <ul>
          <li>Fighters</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
