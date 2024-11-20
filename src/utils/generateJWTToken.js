const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ username: user.username, email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
};

module.exports = { generateToken };