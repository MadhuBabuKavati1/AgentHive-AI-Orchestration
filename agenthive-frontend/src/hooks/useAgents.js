import { useState, useEffect } from "react";
import { api } from "./useAPI";

export default function useAgents() {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    api.get("/agents").then((res) => setAgents(res.data)).catch(() => {});
  }, []);
  return agents;
}
