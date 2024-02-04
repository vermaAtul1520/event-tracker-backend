const express = require('express');
const User = require('../models/Users');
const Router = express.Router();
const jwt = require('jsonwebtoken');

Router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Replace with actual user authentication logic (e.g., check against a database)
    const user = User.find({ username, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user: { username, password } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

Router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.json({ message: 'User registeration failed',error});
    }
});

Router.get('/logout', async (req, res) => {
    const token = req.header('Authorization');

    if (token) {
        tokenBlacklist.blacklistToken(token);
    }

    res.json({ message: 'Logout successful' });
})

// Endpoint to deactivate a user
Router.put('/deactivate/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID and update its isActive field to false
        await User.findByIdAndUpdate(userId, { isActive: false });

        res.json({ message: 'User deactivated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Endpoint to reactivate a user
Router.put('/reactivate/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID and update its isActive field to true
        await User.findByIdAndUpdate(userId, { isActive: true });

        res.json({ message: 'User reactivated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = Router;