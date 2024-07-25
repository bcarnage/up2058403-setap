const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

app.use(bodyParser.json());
app.use(cors());

// Initialize database
db.serialize(() => {
  db.run("CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT, description TEXT, startDate TEXT, endDate TEXT)");
  db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, projectId INTEGER, name TEXT, deadline TEXT, priority TEXT, status TEXT, FOREIGN KEY(projectId) REFERENCES projects(id))");
});

// Create Project
app.post('/projects', (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  db.run("INSERT INTO projects (name, description, startDate, endDate) VALUES (?, ?, ?, ?)", [name, description, startDate, endDate], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Assign Task
app.post('/tasks', (req, res) => {
  const { projectId, name, deadline, priority, status } = req.body;
  db.run("INSERT INTO tasks (projectId, name, deadline, priority, status) VALUES (?, ?, ?, ?, ?)", [projectId, name, deadline, priority, status], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Get Dashboard
app.get('/dashboard', (req, res) => {
  db.all(`
    SELECT p.id AS projectId, p.name AS projectName, t.name AS taskName, t.deadline, t.priority, t.status
    FROM projects p
    LEFT JOIN tasks t ON p.id = t.projectId
  `, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));