import React from "react";
import LogViewer from "../components/LogViewer";

export default function Logs() {
  const logs = [
    { time: "16:20:11", message: "ExtractorAgent started task T001" },
    { time: "16:21:05", message: "SummarizerAgent received output" },
    { time: "16:22:10", message: "Workflow completed successfully" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Logs</h1>
      <LogViewer logs={logs} />
    </div>
  );
}
