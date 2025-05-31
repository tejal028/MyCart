const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/books', bookRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // serve index.html

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
