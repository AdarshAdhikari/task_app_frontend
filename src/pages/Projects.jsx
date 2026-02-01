import { useEffect, useState } from "react";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Load projects
  const loadProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Create project
  const createProject = async () => {
    await API.post("/projects", { name, description });
    setName("");
    setDescription("");
    loadProjects(); // refresh list
  };

  return (
    <div>
      <h2>My Projects</h2>

      {/* Create Project Form */}
      <div style={{ border: "1px solid black", padding: 10, marginBottom: 20 }}>
        <h3>Create Project</h3>
        <input
          placeholder="Project Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <button onClick={createProject}>Add Project</button>
      </div>

      {/* Project List */}
       {projects.map((p) => (
      <ProjectCard key={p._id} project={p} reload={loadProjects} />
    ))}

    </div>
  );
}

export default Projects;
