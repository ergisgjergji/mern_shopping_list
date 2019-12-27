const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: 1 })
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   PUT api/items/:id
// @desc    Modify an item
// @access  Private
router.put('/:id', auth, (req, res) => {
    const filter = { _id: req.params.id };
    const updateField = { name: req.body.name };

    Item.findOneAndUpdate(filter, updateField, { new: true })
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;