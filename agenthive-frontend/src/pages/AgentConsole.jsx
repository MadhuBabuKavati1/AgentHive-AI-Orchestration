import React, { useState } from "react";
import { runTask, addKnowledge } from "../services/agenthive";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentConsole() {
  const [mode, setMode] = useState("run");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openSections, setOpenSections] = useState({
    extraction: true,
    context: true,
    summary: true,
    analysis: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("⚠️ Please enter some text first!");
      return;
    }

    setLoading(true);
    setOutput(null);

    try {
      const data =
        mode === "run" ? await runTask(input) : await addKnowledge(input);
      setOutput(data);

      toast.success(
        mode === "run"
          ? "🚀 Workflow executed successfully!"
          : "💾 Knowledge added to memory!"
      );
    } catch (err) {
      console.error(err);
      toast.error("❌ Backend unreachable. Check FastAPI server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="console-container fade-in">
      <Toaster position="top-center" />

      <h1>🧠 AgentHive Console</h1>
      <p>Run intelligent workflows or inject new knowledge into your agent network.</p>

      {/* --- Mode Buttons --- */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setMode("run")}
          className={`btn ${mode === "run" ? "active" : ""}`}
          style={{
            background:
              mode === "run"
                ? "linear-gradient(90deg, #2563eb, #58a6ff)"
                : "rgba(30, 35, 40, 0.8)",
            border: "1px solid rgba(88,166,255,0.3)",
            color: "#f0f6fc",
            padding: "0.5rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🚀 Run Workflow
        </button>
        <button
          onClick={() => setMode("add")}
          className={`btn ${mode === "add" ? "active" : ""}`}
          style={{
            background:
              mode === "add"
                ? "linear-gradient(90deg, #238636, #2ea043)"
                : "rgba(30, 35, 40, 0.8)",
            border: "1px solid rgba(63,185,80,0.3)",
            color: "#f0f6fc",
            padding: "0.5rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💾 Add Knowledge
        </button>
      </div>

      {/* --- Input Form --- */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "run"
              ? "Enter text or question to analyze..."
              : "Enter knowledge or passage to store..."
          }
        />
        <button className="run-btn" type="submit" disabled={loading}>
          {loading
            ? "⏳ Processing..."
            : mode === "run"
            ? "Run Agent Workflow"
            : "Add to Knowledge Base"}
        </button>
      </form>

      {/* --- Spinner --- */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
              width: "45px",
              height: "45px",
              border: "4px solid rgba(88,166,255,0.3)",
              borderTop: "4px solid #58a6ff",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          />
        </div>
      )}

      {/* --- Results --- */}
      <AnimatePresence>
        {output && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="result-grid"
          >
            {/* --- Extraction --- */}
            {output.extraction && (
              <CollapsibleCard
                title="🧩 Extraction"
                open={openSections.extraction}
                onToggle={() => toggleSection("extraction")}
              >
                <p><b>Entities:</b> {output.extraction.entities?.join(", ") || "None"}</p>
                <p className="dim-text">
                  Embedding Shape: {output.extraction.embedding_shape}
                </p>
              </CollapsibleCard>
            )}

            {/* --- Knowledge Context --- */}
            {output.context && (
              <CollapsibleCard
                title="📚 Knowledge Context"
                open={openSections.context}
                onToggle={() => toggleSection("context")}
              >
                {output.context.error ? (
                  <p className="dim-text">{output.context.error}</p>
                ) : (
                  <ul>
                    {output.context.results?.map((r, i) => (
                      <li key={i}>
                        <p>{r.text}</p>
                        <p className="dim-text">Similarity: {r.similarity}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CollapsibleCard>
            )}

            {/* --- Summary --- */}
            {output.summary && (
              <CollapsibleCard
                title="🧠 Summary"
                open={openSections.summary}
                onToggle={() => toggleSection("summary")}
              >
                <p>{output.summary}</p>
              </CollapsibleCard>
            )}

            {/* --- Analysis --- */}
            {output.analysis && (
              <CollapsibleCard
                title="🔍 Analysis"
                open={openSections.analysis}
                onToggle={() => toggleSection("analysis")}
              >
                <p>
                  <b>Sentiment:</b> {output.analysis.sentiment} (
                  {output.analysis.sentiment_score})
                </p>
                <p>
                  <b>Topic:</b> {output.analysis.predicted_topic} (
                  confidence {output.analysis.topic_confidence})
                </p>
              </CollapsibleCard>
            )}

            {/* --- Knowledge Add Result --- */}
            {output.message && (
              <CollapsibleCard
                title="✅ Knowledge Added"
                open
                onToggle={() => {}}
              >
                <pre>{JSON.stringify(output.result, null, 2)}</pre>
              </CollapsibleCard>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------- CollapsibleCard Component -------- */
function CollapsibleCard({ title, open, onToggle, children }) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className="card"
    >
      <div
        className="card-header"
        onClick={onToggle}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <h3>{title}</h3>
        <span style={{ color: "#58a6ff", fontSize: "1.2rem" }}>
          {open ? "▾" : "▸"}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-content" style={{ marginTop: "0.5rem" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
