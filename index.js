// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
mongoose.connect('mongodb+srv://cse194919164:cse194919164@cluster0.fqugecq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', 
{ useNewUrlParser: true, useUnifiedTopology: true });


const Task = mongoose.model('Task', {
  title: String,
  description: String,
  status: String,
});



app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({ title, description, status });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndRemove(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
