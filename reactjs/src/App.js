import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Fighter from "./pages/Fighter";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthService from "./services/AuthServices";
import LogoutButton from "./components/LogoutButton";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("Current User on Mount:", user); // Debug statement
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <header className="bg-gray-900 p-4">
        {currentUser ? (
          <div className="flex justify-between items-center">
            <p className="text-green-500 text-xl font-bold">Logged in</p>
            <LogoutButton setCurrentUser={setCurrentUser} />
          </div>
        ) : (
          <p className="text-red-500 text-xl font-bold">Not logged in</p>
        )}
      </header>
      <main className="p-4">
        <Routes>
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/fighters/:id"
            element={
              <ProtectedRoute>
                <Fighter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard setCurrentUser={setCurrentUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
