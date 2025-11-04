import { useState, useEffect } from "react";
import { api } from "./useAPI";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data)).catch(() => {});
  }, []);
  return tasks;
}
