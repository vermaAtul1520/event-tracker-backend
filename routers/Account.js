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
        next(error);
    }
});

Router.get('/logout', async (req, res) => {
    const token = req.header('Authorization');

    if (token) {
        tokenBlacklist.blacklistToken(token);
    }

    res.json({ message: 'Logout successful' });
})


module.exports = Router;