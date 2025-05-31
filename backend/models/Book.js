const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  quantity: Number
});

module.exports = mongoose.model('Book', bookSchema);
