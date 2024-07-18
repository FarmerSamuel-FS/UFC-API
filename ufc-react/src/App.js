import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Fighter from "./pages/Fighter";
import Dashboard from "./pages/Dashboard";

function App() {
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
