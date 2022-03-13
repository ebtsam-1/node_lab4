const mongoose = require("mongoose");

const schema = new mongoose.Schema({
      title: 'string',
      status: 'string'
})

module.exports = schema;