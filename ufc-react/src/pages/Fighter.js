import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Fighter() {
  const [fighter, setFighter] = useState({
    name: "",
    age: "",
    record: {
      wins: "",
      losses: "",
    },
    region: "",
    league: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getFighter();
  }, []);

  const getFighter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/fighters/${id}`);
      const data = await response.json();
      console.log({ data });
      setFighter(data);
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteFighter = async () => {
    try {
      await fetch(`${API_BASE}/fighters/${id}`, {
        method: "DELETE",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateFighter = async () => {
    try {
      await fetch(`${API_BASE}/fighters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fighter),
      });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFighter();
  };

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    if (name === "wins" || name === "losses") {
      setFighter((prevFighter) => ({
        ...prevFighter,
        record: {
          ...prevFighter.record,
          [name]: value,
        },
      }));
    } else {
      setFighter((prevFighter) => ({
        ...prevFighter,
        [name]: value,
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 inline-block"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 inline-block"
        >
          Fighters Dashboard
        </Link>
        <h1 className="text-2xl font-bold mt-4">Fighter Profile:</h1>
        <h2>{fighter.name}</h2>
        <p className="text-lg">Age: {fighter.age}</p>
        <p className="text-lg">Wins: {fighter.record.wins}</p>
        <p className="text-lg">Losses: {fighter.record.losses}</p>
        <p className="text-lg">Region: {fighter.region}</p>
        <p className="text-lg">League: {fighter.league}</p>
        <button
          onClick={() => deleteFighter()}
          className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"
        >
          Delete Fighter
        </button>
        <h3 className="text-lg font-semibold mt-4">Edit Fighter Info:</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block">
              Name:
              <input
                type="text"
                name="name"
                value={fighter.name}
                onChange={handleInputChanges}
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
                value={fighter.age}
                onChange={handleInputChanges}
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
                value={fighter.record.wins}
                onChange={handleInputChanges}
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
                value={fighter.record.losses}
                onChange={handleInputChanges}
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
                value={fighter.region}
                onChange={handleInputChanges}
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
                value={fighter.league}
                onChange={handleInputChanges}
                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Fighter Info
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
    </div>
  );
}

export default Fighter;
