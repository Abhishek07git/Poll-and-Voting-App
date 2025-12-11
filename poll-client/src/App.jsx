import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePoll from "./pages/CreatePoll";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api/axios";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("pv_user");
    return raw ? JSON.parse(raw) : null;
  });

  const navigate = useNavigate();

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("pv_user", JSON.stringify(user));
    else localStorage.removeItem("pv_user");
  }, [user]);

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("pv_token");
    navigate("/login");
  };

  // Axios interceptor to attach token
  useEffect(() => {
    const req = (config) => {
      const t = localStorage.getItem("pv_token");
      if (t) config.headers = { ...config.headers, Authorization: `Bearer ${t}` };
      return config;
    };
    const id = api.interceptors.request.use(req);
    return () => api.interceptors.request.eject(id);
  }, []);

  return (
    <div className="app-root">
      <Navbar user={user} onLogout={logout} />
      <main className="container">
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup onLogin={setUser} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="create" element={<CreatePoll />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Poll routes */}
          <Route path="/" element={<PollList user={user} />} />
          <Route path="/polls/:id" element={<PollDetail user={user} />} />

          {/* Fallback */}
          <Route path="*" element={<PollList user={user} />} />
        </Routes>
      </main>
    </div>
  );
}
