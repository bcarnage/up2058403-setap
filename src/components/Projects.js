// src/components/Projects.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div>
      <h2>Projects</h2>
      <Link to="/projects/new">Create New Project</Link>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
            <button onClick={() => handleDelete(project.id)}>Delete Project</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;