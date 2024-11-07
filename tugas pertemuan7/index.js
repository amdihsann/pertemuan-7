const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'hitlab', completed: false },
  { id: 2, task: 'webdev', completed: false }
];

app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
  
    if (!todo) {
      return res.status(404).json({ message: 'not found' });
    }
  
    res.json(todo);
  });

app.get('/', (req, res) => {
  res.send('UI');
});

// Update ToDo
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'not found' });
  }

  if (task) todo.task = task;
  if (typeof completed === 'boolean') todo.completed = completed;

  res.json({ message: 'editing', todo });
});

// Hapus ToDo
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'wayoo, ga ada kan' });
  }

  todos.splice(index, 1);

  res.json({ message: 'keapus' });
});

// Jalanin servernya
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`server jalan di http://localhost:${PORT}`);
});

app.get('/todos', (req, res) => {
    res.json(todos);
  });
