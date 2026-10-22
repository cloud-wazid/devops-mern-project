
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Checking backend...");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (!response.ok) throw new Error("Failed to load tasks");
      setTasks(await response.json());
      setError("");
    } catch {
      setError("Could not load tasks. Check the backend.");
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) throw new Error("Backend unavailable");
        return response.json();
      })
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Backend unavailable"));

    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to save task");

      setTitle("");
      await loadTasks();
    } catch {
      setError("Could not save task. Check the backend.");
    }
  }

  return (
    <main className="app">
      <h1>DevOps Task Manager</h1>
      <p>Backend status: <strong>{status}</strong></p>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p>{error}</p>}

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title} — {task.status}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
