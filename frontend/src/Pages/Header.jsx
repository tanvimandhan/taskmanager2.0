import React from "react";
import { useAuth } from "../contexts/AuthContext";
// adjust path as needed
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout, isLoading,login } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return null; // optional loading fallback

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer text-blue-600"
        onClick={() => navigate("/")}
      >
        MyApp
      </h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">
              {user.name || user.email}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 font-medium"
            >
              Login
            </button>
            
          </>
        )}
      </div>
    </header>
  );
}
