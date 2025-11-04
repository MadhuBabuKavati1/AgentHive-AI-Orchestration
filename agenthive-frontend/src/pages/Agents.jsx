import React from "react";
import AgentCard from "../components/AgentCard";

export default function Agents() {
  const agents = [
    { name: "ExtractorAgent", description: "Extracts information", status: "active" },
    { name: "SummarizerAgent", description: "Summarizes data", status: "idle" },
    { name: "ValidatorAgent", description: "Validates outputs", status: "idle" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agents</h1>
      <div className="grid grid-cols-3 gap-4">
        {agents.map((a, i) => (
          <AgentCard key={i} {...a} onRun={() => alert(`Running ${a.name}`)} />
        ))}
      </div>
    </div>
  );
}
