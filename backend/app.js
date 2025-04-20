const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3008;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json([ "test" ]);
});

app.get('/tasks', (req, res) => {
  res.json([{ id: 1, title: 'Take out trash', completed: false }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
