import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  console.log("Tasks page rendered");
  const [sentTasks, setSentTasks] = useState([]);
  const [receivedTasks, setReceivedTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSentTasks(res.data.sent);
      setReceivedTasks(res.data.received);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <h2>Tasks I Sent</h2>

      {sentTasks
        .filter((task) => filter === "all" || task.status === filter)
        .map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <p>
              Assigned To:{" "}
              {task.receivers.map((u) => u.name || u.email).join(", ")}
            </p>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}

      <h2 style={{ marginTop: "30px" }}>Tasks Assigned To Me</h2>

      {receivedTasks
        .filter((task) => filter === "all" || task.status === filter)
        .map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <p>Sent By: {task.sender?.name || task.sender?.email}</p>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <div>
              <label>Status: </label>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
