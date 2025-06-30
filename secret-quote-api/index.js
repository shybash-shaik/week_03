import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { users } from './data/Users.js';
import { todos } from './data/todos.js';
import authMiddleware from './middleware/auth.js';
import authorizeAdmin from './middleware/authorizeAdmin.js';

const app = express();
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = 'w7xY!mZp$3uN&kVr#bLq@J8eTgXc*Z1A';

app.post('/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  const exists = users.find(user => user.username === username);
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  res.json({ accessToken: token });
});

app.get('/api/todos', authMiddleware(JWT_SECRET), (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
});

app.post('/api/todos', authMiddleware(JWT_SECRET), (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    userId: req.user.id,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', authMiddleware(JWT_SECRET), (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === todoId && todo.userId === req.user.id);
  if (index === -1) {
    return res.status(403).json({ message: 'Not allowed or Todo not found' });
  }
  const deleted = todos.splice(index, 1);
  res.json({ message: 'Todo deleted', deleted });
});

app.get('/api/admin/all-todos', authMiddleware(JWT_SECRET), authorizeAdmin, (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
