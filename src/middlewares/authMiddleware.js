const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak ditemukan' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'SECRET_KEY'); // Ganti 'SECRET_KEY' sesuai dengan yang digunakan saat membuat token
        req.user = decoded; // Simpan data pengguna dari token
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};
