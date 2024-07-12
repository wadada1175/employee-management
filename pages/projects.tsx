import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(
          error.response ? error.response.data : "An unexpected error occurred"
        );
      });
  }, []);

  return (
    <div>
      <h1>案件一覧</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {projects.map(
          (project: { id: number; company_name: string; date: string }) => (
            <li key={project.id}>
              {project.company_name}: {project.date}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Projects;
