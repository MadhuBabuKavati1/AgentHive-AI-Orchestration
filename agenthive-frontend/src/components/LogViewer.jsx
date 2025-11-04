import React from "react";

export default function LogViewer({ logs }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 font-mono text-sm h-[400px] overflow-y-auto">
      {logs.map((log, idx) => (
        <div key={idx} className="text-gray-300 mb-1">
          <span className="text-gray-500">[{log.time}]</span> {log.message}
        </div>
      ))}
    </div>
  );
}
