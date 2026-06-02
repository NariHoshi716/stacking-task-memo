'use strict';

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/tasks', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.listen(8000, () => {
  console.log('Listening on 8000');
});