// src/services/agenthive.js
import axios from "axios";

// Base URL for your FastAPI backend
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// 🔹 Run full agent workflow
export async function runTask(text) {
  const response = await api.post("/run-task", { text });
  return response.data;
}

// 🔹 Add a document to persistent ChromaDB
export async function addKnowledge(text) {
  const response = await api.post("/add-knowledge", { text });
  return response.data;
}
