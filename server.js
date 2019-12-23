const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(res => console.log('Database connection - SUCCESS!'))
    .catch(err => console.log('Database connection - FAIL!'));

    
// Routes
const items = require('./routes/api/item');
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));