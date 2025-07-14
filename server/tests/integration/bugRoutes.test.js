const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bugRoutes = require('../../src/routes/bugRoutes');
const Bug = require('../../src/models/Bug');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Bug API', () => {
  beforeEach(async () => {
    await Bug.deleteMany({});
  });

  test('should create a new bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Test Description' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Bug');
  });

  test('should get all bugs', async () => {
    await Bug.create({ title: 'Test Bug', description: 'Test Description' });
    const response = await request(app).get('/api/bugs');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('should update a bug', async () => {
    const bug = await Bug.create({ 
      title: 'Test Bug', 
      description: 'Test Description' 
    });
    const response = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'in-progress' });
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('in-progress');
  });

  test('should delete a bug', async () => {
    const bug = await Bug.create({ 
      title: 'Test Bug', 
      description: 'Test Description' 
    });
    const response = await request(app)
      .delete(`/api/bugs/${bug._id}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bug deleted');
  });
});