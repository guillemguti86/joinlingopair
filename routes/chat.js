const express = require('express');
const router = express.Router();

// Array para almacenar mensajes (en producción usar BD)
const messages = [];

// GET /chat/messages/:conversationId
router.get('/messages/:conversationId', (req, res) => {
    const conversationId = req.params.conversationId;
    const conversationMessages = messages.filter(m => m.conversationId === conversationId);
    
    res.json({ 
        conversationId,
        messages: conversationMessages
    });
});

// POST /chat/messages
router.post('/messages', (req, res) => {
    try {
        const { conversationId, senderId, text } = req.body;
        
        const message = {
            id: Date.now(),
            conversationId,
            senderId,
            text,
            timestamp: new Date(),
            read: false
        };
        
        messages.push(message);
        
        res.status(201).json({ 
            message: 'Message sent',
            data: message
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /chat/messages/:messageId/read
router.put('/messages/:messageId/read', (req, res) => {
    const messageId = req.params.messageId;
    const message = messages.find(m => m.id == messageId);
    
    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }
    
    message.read = true;
    res.json({ message: 'Message marked as read', data: message });
});

module.exports = router;
