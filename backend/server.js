import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
let nextId = 4;
let students = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', course: 'Computer Science' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', course: 'Information Technology' },
  { id: 3, name: 'Arjun Mehta', email: 'arjun@example.com', phone: '9876543212', course: 'Business Administration' }
];

app.use(cors());
app.use(express.json());

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok', service: 'StudentHub API' });
});

app.get('/api/students', (request, response) => {
  response.json(students);
});

app.get('/api/students/:id', (request, response) => {
  const student = students.find((item) => item.id === Number(request.params.id));
  if (!student) return response.status(404).json({ error: 'Student not found' });
  response.json(student);
});

app.post('/api/students', (request, response) => {
  const { name, email, phone, course } = request.body;
  if (!name || !email || !phone || !course) {
    return response.status(400).json({ error: 'name, email, phone, and course are required' });
  }
  const student = { id: nextId++, name, email, phone, course };
  students.push(student);
  response.status(201).json(student);
});

app.delete('/api/students/:id', (request, response) => {
  const id = Number(request.params.id);
  const originalLength = students.length;
  students = students.filter((student) => student.id !== id);
  if (students.length === originalLength) return response.status(404).json({ error: 'Student not found' });
  response.status(204).send();
});

if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`StudentHub API listening on port ${port}`));

export default app;
