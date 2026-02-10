
import API from "../api/api";
import { useEffect, useState } from "react";

import ProgressCircle from "./ProgressCircle";
import "./projectcard.css";



function ProjectCard({ project, reload }) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [progress, setProgress] = useState(0);

  //load progress 
  const loadProgress = async () => {
    const res = await API.get(`/projects/${project._id}/progress`);
    setProgress(res.data.percent);
  };
  useEffect(() => {
    loadProgress();
  }, []);


  // Add task
  const addTask = async () => {
    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    await API.post(`/projects/${project._id}/tasks`, {
      name: taskName,
      description: taskDesc
    });
    setTaskName("");
    setTaskDesc("");
    reload();
    loadProgress();
  };

  // Toggle task completed
  const toggleTask = async (taskId, current) => {
    await API.put(`/projects/${project._id}/task/${taskId}`, {
      completed: !current
    });
    reload();
    loadProgress();
  };

  //delete project
  const deleteProject = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${project._id}`);
      reload(); // refresh project list
    } catch (err) {
      alert("Failed to delete project");
      console.error(err);
    }
  };


  return (
    <div className="project-card">
      {/* Header */}
      <div className="project-card-header">
        <h3>{project.name}</h3>
        <ProgressCircle percent={progress} />
      </div>

      {/* Description */}
      <p className="project-desc">{project.description}</p>

      {/* Add Task Form */}
      <div className="add-task-form">
        <input
          placeholder="Task name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <input
          placeholder="Task description"
          value={taskDesc}
          onChange={e => setTaskDesc(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className="project-tasks">
        {project.tasks.map((t) => (
          <li key={t._id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t._id, t.completed)}
            />
            {t.name} – {t.description}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="project-footer">
        <button onClick={deleteProject}>Delete</button>
      </div>
    </div>
  );

}

export default ProjectCard;
