const express = require('express');
const router = express.Router();

// Middleware para verificar JWT (opcional)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    next();
};

// GET /api/users
router.get('/users', verifyToken, (req, res) => {
    res.json({ 
        users: [
            { id: 1, name: 'Alice', language: 'Spanish', level: 'B2' },
            { id: 2, name: 'Bob', language: 'French', level: 'B1' },
            { id: 3, name: 'Charlie', language: 'German', level: 'A2' }
        ]
    });
});

// GET /api/users/:id
router.get('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    res.json({ 
        user: { 
            id: userId, 
            name: 'User ' + userId,
            language: 'English',
            level: 'C1'
        }
    });
});

// GET /api/conversations
router.get('/conversations', verifyToken, (req, res) => {
    res.json({ 
        conversations: [
            { id: 1, partner: 'Alex', language: 'Spanish', messages: 12 },
            { id: 2, partner: 'Maria', language: 'French', messages: 8 }
        ]
    });
});

// GET /api/leaderboard
router.get('/leaderboard', verifyToken, (req, res) => {
    res.json({ 
        leaderboard: [
            { rank: 1, user: 'Alice', xp: 12500 },
            { rank: 2, user: 'Bob', xp: 11200 },
            { rank: 3, user: 'Charlie', xp: 10800 }
        ]
    });
});

module.exports = router;
