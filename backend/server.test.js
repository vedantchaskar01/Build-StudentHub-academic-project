import test from 'node:test';
import assert from 'node:assert/strict';
import app from './server.js';

const testServer = app.listen(0);
const baseUrl = `http://127.0.0.1:${testServer.address().port}`;

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = response.status === 204 ? null : await response.json();
  return { status: response.status, body };
}

test.after(() => testServer.close());

test('health endpoint returns ok', async () => {
  const result = await request('/api/health');
  assert.equal(result.status, 200);
  assert.equal(result.body.status, 'ok');
});

test('students endpoint returns a list', async () => {
  const result = await request('/api/students');
  assert.equal(result.status, 200);
  assert.ok(Array.isArray(result.body));
});

test('students endpoint validates and creates a student', async () => {
  const invalid = await request('/api/students', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  assert.equal(invalid.status, 400);
  const created = await request('/api/students', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Test Student', email: 'test@example.com', phone: '1234567890', course: 'Design' })
  });
  assert.equal(created.status, 201);
  assert.equal(created.body.name, 'Test Student');
});
