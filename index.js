const express = require('express')
const app = express();
const mongoose = require('mongoose');
const games = require('./routes/games');

mongoose.connect('mongodb://localhost:27017/New_Project')
    .then(() => {console.log('Connected to MongoDB..')})
    .catch((err) => {console.log('Could not connect..')});

app.use(express.json());
app.use('/api/games', games);

app.get('/', (req, res) => {
    res.send('Enter an id in the URL');
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}...`))