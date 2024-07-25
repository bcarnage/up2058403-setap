import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import TaskList from './components/TaskList'; // Ensure this component exists
import NotFound from './components/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Project Management App</h1>
          <ProjectForm /> {/* Ensure this component is correctly working */}
        </header>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
