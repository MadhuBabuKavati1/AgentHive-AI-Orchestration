import React from "react";

export default function AgentCard({ name, description, status, onRun }) {
  return (
    <div className="p-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-indigo-400">{name}</h2>
      <p className="text-sm text-gray-400 mt-1 mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            status === "active"
              ? "bg-green-600/30 text-green-400"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {status.toUpperCase()}
        </span>
        <button
          onClick={onRun}
          className="text-sm bg-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-700"
        >
          Run
        </button>
      </div>
    </div>
  );
}
