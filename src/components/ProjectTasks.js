import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks?projectId=${id}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [id]);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTaskTitle, projectId: id })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTaskTitle('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h2>Tasks for Project {id}</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectTasks;
