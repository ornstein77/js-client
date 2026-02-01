const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/get', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users); 
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

app.post('/create', async (req, res) => {
  const { name } = req.body; 
  try {
    const newUser = await prisma.user.create({
      data: { name: name }
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});