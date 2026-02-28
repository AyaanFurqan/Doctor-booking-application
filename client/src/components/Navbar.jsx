// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">AI Clinic SaaS</Link>
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <span>Hi, {user.name}</span>

            {/* Role-based links */}
            {user.role === "admin" && (
              <Link to="/dashboard" className="hover:underline">
                Admin Dashboard
              </Link>
            )}
            {(user.role === "doctor" || user.role === "receptionist") && (
              <Link to="/appointments" className="hover:underline">
                Appointments
              </Link>
            )}
            {user.role === "patient" && (
              <Link to="/dashboard" className="hover:underline">
                My Profile
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;