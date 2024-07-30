import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthServices";

function Dashboard({ setCurrentUser }) {
  const [fighters, setFighters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newFighter, setNewFighter] = useState({
    name: "",
    age: "",
    wins: "",
    losses: "",
    region: "",
    league: "",
  });
  const [creating, setCreating] = useState(false);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    getFighters();
  }, []);

  const getFighters = async () => {
    setLoading(true);
    const token = currentUser?.token;
    try {
      const response = await fetch(`${API_BASE}/fighters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch fighters");
      }
      const data = await response.json();
      setFighters(data);
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFighter({ ...newFighter, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    const token = currentUser?.token;
    try {
      await fetch(`${API_BASE}/fighters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newFighter,
          record: {
            wins: newFighter.wins,
            losses: newFighter.losses,
          },
        }),
      });
      setNewFighter({
        name: "",
        age: "",
        wins: "",
        losses: "",
        region: "",
        league: "",
      });
      await getFighters(); // Refresh the list of fighters after creating a new one
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-5xl font-bold">Fighters Dashboard</h1>
        <h3 className="text-3xl font-semibold mt-4">Fighters:</h3>
        <ul>
          {fighters &&
            fighters.map((fighter) => (
              <li key={fighter._id}>
                <Link
                  to={`/fighters/${fighter._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {fighter.name}
                </Link>
              </li>
            ))}
          <p className="text-sm">(Click Fighter Name to Edit)</p>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Create New Fighter:</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block">
              Full Name:
              <input
                type="text"
                name="name"
                value={newFighter.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              Age:
              <input
                type="number"
                name="age"
                value={newFighter.age}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              Wins:
              <input
                type="number"
                name="wins"
                value={newFighter.wins}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              Losses:
              <input
                type="number"
                name="losses"
                value={newFighter.losses}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              Region:
              <input
                type="text"
                name="region"
                value={newFighter.region}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              League:
              <input
                type="text"
                name="league"
                value={newFighter.league}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={creating}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {creating ? "Creating..." : "Create Fighter"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
    </div>
  );
}

export default Dashboard;
