import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App bg-gray-800 min-h-screen text-white flex flex-col items-center justify-center">
      <header className="App-header text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to UFC Fighters Roster
        </h1>
        <p className="text-xl mt-4 mb-6">
          Manage your UFC fighters with ease. Our application allows you to add,
          edit, and view details of UFC fighters. Stay updated with the latest
          information on your favorite fighters.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
          >
            Signup
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
