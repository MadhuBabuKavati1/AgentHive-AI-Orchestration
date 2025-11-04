import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Workflows from "./pages/Workflows";
import Logs from "./pages/Logs";
import Navbar from "./components/Navbar";
import AgentConsole from "./pages/AgentConsole"; // 👈 New page

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="app"
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#0b0c10",
          color: "#fff",
          fontFamily: "Inter, monospace",
        }}
      >
        {/* Sidebar */}
        <aside
          className="sidebar"
          style={{
            width: "220px",
            backgroundColor: "#1f2833",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ color: "#66fcf1", fontSize: "1.6rem" }}>AgentHive</h1>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
                gap: "0.75rem",
              }}
            >
              <Link
                to="/"
                style={{ color: "#c5c6c7", textDecoration: "none" }}
              >
                Dashboard
              </Link>
              <Link
                to="/agents"
                style={{ color: "#c5c6c7", textDecoration: "none" }}
              >
                Agents
              </Link>
              <Link
                to="/workflows"
                style={{ color: "#c5c6c7", textDecoration: "none" }}
              >
                Workflows
              </Link>
              <Link
                to="/logs"
                style={{ color: "#c5c6c7", textDecoration: "none" }}
              >
                Logs
              </Link>
              <Link
                to="/console"
                style={{
                  color: "#66fcf1",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                ⚙️ Console
              </Link>
            </nav>
          </div>

          <footer style={{ fontSize: "0.8rem", color: "#45a29e" }}>
            © 2025 AgentHive
          </footer>
        </aside>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0b0c10",
          }}
        >
          <Navbar />
          <main style={{ padding: "1.5rem", flex: 1, overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/console" element={<AgentConsole />} /> {/* 👈 New Route */}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
