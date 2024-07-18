import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Fighter from "./pages/Fighter";
import Dashboard from "./pages/Dashboard";

function App() {
<<<<<<< HEAD:ufc-react/src/App.js
=======
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

>>>>>>> main:reactjs/src/App.js
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/fighters/:id" exact element={<Fighter />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
