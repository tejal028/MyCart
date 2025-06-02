const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/bookstore', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

  mongoose.connect('mongodb://mycartuser:mycartpassword123@mycart-docdb-cluster-0.cl8u48saqn8m.ap-south-1.docdb.amazonaws.com:27017/bookstore?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  sslValidate: false, // Important: DocumentDB uses self-signed cert, skip validation
}).then(() => console.log('Connected to AWS DocumentDB'))
  .catch(err => console.error('DocumentDB connection error:', err));
  
app.use('/api/books', bookRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // serve index.html

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
