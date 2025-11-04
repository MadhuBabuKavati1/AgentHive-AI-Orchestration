import React from "react";

export default function Dashboard() {
  const agents = [
    { name: "ExtractorAgent", description: "Extracts data", status: "Active" },
    { name: "SummarizerAgent", description: "Summarizes text", status: "Idle" },
    { name: "OrchestratorAgent", description: "Coordinates workflow", status: "Active" },
  ];

  const tasks = [
    { id: "T001", agent: "Extractor", status: "Completed", time: "16:21:01" },
    { id: "T002", agent: "Summarizer", status: "Running", time: "16:22:12" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Overview</h2>
      {agents.map((a) => (
        <div className="card" key={a.name}>
          <h3>{a.name}</h3>
          <p>{a.description}</p>
          <button className="btn">Run</button>
        </div>
      ))}

      <h3>Tasks</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.agent}</td>
              <td>{t.status}</td>
              <td>{t.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
