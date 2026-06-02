'use strict';

const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.post('/tasks', async (req, res) => {
  const {
    userName,
    title,
    content,
    deadline
  } = req.body;

  await prisma.task.create({
    data: {
      userName,
      title,
      content,
      deadline: new Date(deadline)
    }
  });

  res.redirect('/');
});

app.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.render('index', {
    tasks
  });
});

app.post('/tasks/:id/delete', async (req, res) => {
  await prisma.task.delete({
    where: {
      id: Number(req.params.id)
    }
  });

  res.redirect('/');
});

app.listen(8000, () => {
  console.log('Listening on 8000');
});

app.post('/tasks/:id/complete', async (req, res) => {
  await prisma.task.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      completed: true
    }
  });

  res.redirect('/');
});