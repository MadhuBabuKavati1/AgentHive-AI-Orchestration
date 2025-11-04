import React from "react";

export default function TaskTable({ tasks }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-400 text-sm">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Agent</th>
            <th className="p-3">Status</th>
            <th className="p-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr
              key={i}
              className="border-t border-gray-800 hover:bg-gray-800/40"
            >
              <td className="p-3">{t.id}</td>
              <td className="p-3">{t.agent}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    t.status === "completed"
                      ? "bg-green-600/30 text-green-400"
                      : "bg-yellow-600/30 text-yellow-400"
                  }`}
                >
                  {t.status}
                </span>
              </td>
              <td className="p-3 text-gray-400">{t.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
