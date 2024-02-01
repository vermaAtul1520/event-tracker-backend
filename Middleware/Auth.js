const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const authenticateUser = async(req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    token=token.replace('Bearer ','');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)?.user;
        const { username, password }=decoded
        let useData = await User.find({ username, password })
        req.user = useData[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
    }
};

module.exports = authenticateUser;