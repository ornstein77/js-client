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


app.use(cors()); 
app.use(express.json());

app.get('/get', async (req, res) => {
  const user = await prisma.user.findFirst();
  res.json(user || { message: "Пользователей пока нет" });
});

app.post('/create', async (req, res) => {
  const { name } = req.body; 
  try {
    const newUser = await prisma.user.create({
      data: { name: name }
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Не удалось создать пользователя" });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});