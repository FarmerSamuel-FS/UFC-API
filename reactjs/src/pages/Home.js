import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold">UFC-API HomePage:</h1>
        <h5>Welcome to the UFC Fighters Roster API</h5>
        <p>Click Fighters-Dashboard to see and edit current Roster</p>
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4 inline-block"
        >
          Fighters-Dashboard
        </Link>
      </header>
    </div>
  );
}

export default Home;
