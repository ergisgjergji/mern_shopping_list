const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if(!name || !email || !password) {
        return res.json({ status: 400, message: 'All fields are required!' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) 
                return res.json({ status: 400, message: 'User already exists' });
            const newUser = new User({
                name, 
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user._id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            name: user.name, 
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        });
});

module.exports = router;