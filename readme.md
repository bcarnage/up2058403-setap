install dependencies
npm install express sqlite3 body-parser cors
npx create-react-app project-management-app
cd project-management-app
npm install axios
npm install react-scripts
npm install react-dom
npm install react
npm install react-router-dom axios
npm install json-server --save-dev





import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import NotFound from './components/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Project Management App</h1>
        </header>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;