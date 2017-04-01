const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('BookSchema', BookSchema);
