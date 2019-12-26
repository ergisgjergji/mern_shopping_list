const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');

const app = express();

// Middleware
app.use(bodyParser.json());

// DB config
const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true })
    .then(res => console.log('Database connection - SUCCESS!'))
    .catch(err => console.log('Database connection - FAIL!'));

    
// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/items', require('./routes/api/items'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));