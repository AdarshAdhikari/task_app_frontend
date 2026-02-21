import { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.css";

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
    <div className="tasks-page">
      <h1 className="page-title">My Tasks</h1>
      <div className="tasks-header">
        <label>Filter: </label>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="tasks-wrapper">
        <div className="tasks-column">
          <h2 className="section-title">Tasks I Sent</h2>

          {sentTasks
            .filter((task) => filter === "all" || task.status === filter)
            .map((task) => (
              <div className="task-card" key={task._id}>
                <p>
                  Assigned To:{" "}
                  {task.receivers.map((u) => u.name || u.email).join(", ")}
                </p>

                <h4>{task.title}</h4>
                <p>{task.description}</p>

                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>

                <br />
                <br />

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

        <div className="tasks-column">
          <h2 className="section-title">Tasks Assigned To Me</h2>

          {receivedTasks
            .filter((task) => filter === "all" || task.status === filter)
            .map((task) => (
              <div className="task-card" key={task._id}>
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
      </div>
    </div>
  );
};

export default Tasks;
