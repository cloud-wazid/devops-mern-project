
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://devops-mern-project.onrender.com";

function App() {
  const [status, setStatus] = useState("Checking backend...");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) throw new Error("Failed to load tasks");

      setTasks(await response.json());
      setError("");
    } catch {
      setError("Could not load tasks. Please check the backend.");
    }
  }

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(`${API_URL}/api/health`);
        if (!response.ok) throw new Error("Backend unavailable");

        const data = await response.json();
        setStatus(data.status);
      } catch {
        setStatus("Backend unavailable");
      }
    }

    checkBackend();
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!response.ok) throw new Error("Failed to save task");

      setTitle("");
      await loadTasks();
    } catch {
      setError("Could not save task. Please check the backend.");
    }
  }

  return (
    <main className="app">
      <h1>DevOps Task Manager</h1>

      <p>
        Backend status: <strong>{status}</strong>
      </p>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p role="alert">{error}</p>}

      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} — {task.status}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
