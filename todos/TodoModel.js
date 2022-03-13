const mongoose = require('mongoose');

const todoSchema = require('./todoSchema')

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;