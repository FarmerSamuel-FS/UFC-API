import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import AuthService from "../services/AuthServices";

function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await AuthService.login(email, password);

      console.log("Server response:", response);

      if (response.token) {
        // Update to check for `token`
        setMessage("Login successful!");
        setCurrentUser(response);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold">UFC-API Login:</h1>
        <h5>Welcome to the UFC Fighters Roster API</h5>
        <p>(Login to continue)</p>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-80 mx-auto"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4"
        >
          Sign Up
        </Link>
        <Link
          to="/"
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4"
        >
          Home
        </Link>
      </header>
    </div>
  );
}

export default Login;
