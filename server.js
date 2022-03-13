const express = require('express');
const morgan = require('morgan');
const app = express()
const port = 3000

const path = require('path');
// const logger = require('./middlewares/logger');
const fs = require('fs/promises');

require('./db');

const todo = require('./todo.json');

const todoRouter = require('./todos/todoRouter')

// app.use(logger);
app.use(express.json());
app.use(express.urlencoded());
// app.use(morgan('combined'));
app.use(express.static('public',{
  index: 'index.html'
}));


app.use('/todo', todoRouter);

app.get('/style.css', (req, res) => {
  const filePath = path.join(__dirname, 'style.css')
  res.sendFile(filePath);
})

app.get('/1.jpeg', (req, res) => {
  const filePath = path.join(__dirname, '1.jpeg')
  res.sendFile(filePath);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})