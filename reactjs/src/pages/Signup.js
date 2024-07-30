import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import AuthService from "../services/AuthServices";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await AuthService.signup(
        email,
        password,
        firstName,
        lastName,
        age,
        country,
      );
      if (response) {
        setMessage("Signup successful! Please log in.");
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold">UFC-API Signup:</h1>
        <h5>Welcome to the UFC Fighters Roster API Signup</h5>
        <p>Please complete the form below</p>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-80 mx-auto"
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
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
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
          >
            Signup
          </button>
        </form>
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4"
        >
          Go to Login
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

export default Signup;
