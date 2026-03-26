class Conversation {
    constructor(id, userId1, userId2, language) {
        this.id = id;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.language = language;
        this.messages = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = 'active'; // active, archived, blocked
    }

    // Método para agregar mensaje
    addMessage(senderId, text) {
        const message = {
            id: Date.now(),
            senderId,
            text,
            timestamp: new Date(),
            read: false
        };
        this.messages.push(message);
        this.updatedAt = new Date();
        return message;
    }

    // Método para marcar mensaje como leído
    markMessageAsRead(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            message.read = true;
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }

    // Método para obtener últimos mensajes
    getLastMessages(limit = 10) {
        return this.messages.slice(-limit);
    }

    // Método para archivar conversación
    archive() {
        this.status = 'archived';
        this.updatedAt = new Date();
    }

    // Método para bloquear conversación
    block() {
        this.status = 'blocked';
        this.updatedAt = new Date();
    }

    // Método para obtener información de la conversación
    getInfo() {
        return {
            id: this.id,
            userId1: this.userId1,
            userId2: this.userId2,
            language: this.language,
            messageCount: this.messages.length,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Conversation;
