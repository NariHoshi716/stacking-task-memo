'use strict';

const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.post('/tasks', async (req, res) => {
  try {
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
        deadline: deadline ? new Date(deadline) : null
      }
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
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

app.post('/tasks/:id/complete', async (req, res) => {
  try {
    await prisma.task.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        completed: true
      }
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

app.post('/tasks/:id/delete', async (req, res) => {
  try {
    await prisma.task.delete({
      where: {
        id: Number(req.params.id)
      }
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});