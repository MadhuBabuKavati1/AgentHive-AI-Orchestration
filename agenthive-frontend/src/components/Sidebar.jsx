import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/agents", label: "Agents" },
    { path: "/workflows", label: "Workflows" },
    { path: "/logs", label: "Logs" },
  ];

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 p-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-400">AgentHive</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-3 py-2 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
