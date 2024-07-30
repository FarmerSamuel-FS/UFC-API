import React from "react";
import AuthService from "../services/AuthServices";

const LogoutButton = ({ setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
