import { useEffect, useState } from "react";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";
import "./projects.css";

import AddProjectCard from "../components/AddProjectCard";
import Layout from "../components/Layout";

function Projects() {
  const [projects, setProjects] = useState([]);
  

  // Load projects
 const loadProjects = async () => {
  try {
    const res = await API.get("/projects");
    setProjects(res.data);
  } catch (err) {
    console.error(err.response?.data);
    alert("Failed to load projects");
  }
};


  useEffect(() => {
    loadProjects();
  }, []);

  // Create project
 const createProject = async (projectName, projectDescription) => {
  await API.post("/projects", {
    name: projectName,
    description: projectDescription
  });
  loadProjects();
};

const handleAddProject = () => {
  const projectName = prompt("Enter project name");
  if (!projectName) return;

  const projectDescription = prompt("Enter project description");
  createProject(projectName, projectDescription);
};



return (
  <Layout>
    <div className="projects-page">
      <h2 className="page-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            reload={loadProjects}
          />
        ))}

        <AddProjectCard onAdd={handleAddProject} />
      </div>
    </div>
  </Layout>
);
};

export default Projects;
