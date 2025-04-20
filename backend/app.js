const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const app = express();
const PORT = 3008;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json([ "test" ]);
});

//GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const data = await fs.readFile('./tasks.json', 'utf-8');
    const tasks = JSON.parse(data);
    res.json(tasks);
  } catch (err) {
    console.error('Error while reading file tasks.json:', err);
    res.status(500).json({ message: 'Something goes wrong..' });
  }
});
//GET all tasks



//GET one task
app.get('/tasks/:id', async (req, res) => {
    try {
      const data = await fs.readFile('./tasks.json', 'utf-8');
      const tasks = JSON.parse(data);
      const id = parseInt(req.params.id, 10);
      const task = tasks.find(t => t.id === id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      console.error('Error while reading file tasks.json:', err);
      res.status(500).json({ message: 'Something goes wrong..' });
    }
});
//GET one task



//POST new task
app.post('/tasks', async (req, res) => {
  try {
    const data = await fs.readFile('./tasks.json', 'utf-8');
    const tasks = JSON.parse(data);
    const newTask = {
      id: Date.now(),
      title: req.body.title,
      completed: false
    };
    tasks.push(newTask);
    await fs.writeFile('./tasks.json', JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error while adding new task:', err);
    res.status(500).json({ message: 'Something went wrong..' });
  }
});
//POST new task


//UPDATE task status
app.patch('/tasks/:id', async (req, res) => {
  try {
    const data = await fs.readFile('./tasks.json', 'utf-8');
    const tasks = JSON.parse(data);
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = !task.completed;
    await fs.writeFile('./tasks.json', JSON.stringify(tasks, null, 2));
    res.json(task);
  } catch (err) {
    console.error('Error while updating task:', err);
    res.status(500).json({ message: 'Something went wrong..' });
  }
});
//UPDATE task status

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
