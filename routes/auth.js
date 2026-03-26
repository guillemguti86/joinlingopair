const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock database (reemplazar con tu BD real)
const users = [];

// POST /auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Validar que el usuario no exista
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear usuario
        const newUser = {
            id: Date.now(),
            email,
            name,
            password: hashedPassword,
            createdAt: new Date()
        };
        
        users.push(newUser);
        
        res.status(201).json({ 
            message: 'User registered successfully',
            user: { id: newUser.id, email, name }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generar JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({ 
            message: 'Login successful',
            token,
            user: { id: user.id, email, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /auth/logout
router.get('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
