
import API from "../api/api";
import {useEffect , useState } from "react";
import ProgressBar from "./progressBar"; 


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
  const toggleTask = async (index, current) => {
    await API.put(`/projects/${project._id}/task/${index}`, {
      completed: !current
    });
    reload();
    loadProgress();
  };

  return (
    <div style={{ border: "2px solid blue", padding: 10, margin: 10 }}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>

        {/* Progress Bar */}
        <ProgressBar percent={progress} />


      {/* Add Task Form */}
      <div>
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
      <ul>
        {project.tasks.map((t, index) => (
          <li key={t._id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(index, t.completed)}
            />
            {t.name} - {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectCard;
