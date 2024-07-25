// src/components/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link here
import axios from 'axios';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <Link to="/tasks">Manage Tasks</Link> {/* Ensure Link is used correctly */}
    </div>
  );
}

export default ProjectDetails;