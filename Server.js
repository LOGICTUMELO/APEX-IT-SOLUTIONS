const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a simple schema and model for demonstration
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(500).json({ error: 'Failed to create item' }));
});

// Get all items
app.get('/items', (req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: 'Failed to fetch items' }));
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(500).json({ error: 'Failed to fetch item' }));
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, { new: true })
        .then(item => res.json(item))
        .catch(err => res.status(500).json({ error: 'Failed to update item' }));
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: 'Failed to delete item' }));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
require('dotenv').config();

//const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

