const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de conexión a MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lingopair',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para conectar a la BD
async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL Database');
        connection.release();
        return pool;
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1);
    }
}

// Función para crear tablas
async function createTables() {
    const connection = await pool.getConnection();
    
    try {
        // Tabla de usuarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                language VARCHAR(50),
                level VARCHAR(10) DEFAULT 'A1',
                xp INT DEFAULT 0,
                totalXP INT DEFAULT 0,
                dailyStreak INT DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de conversaciones
        await connection.query(`
            CREATE TABLE IF NOT EXISTS conversations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userId1 INT NOT NULL,
                userId2 INT NOT NULL,
                language VARCHAR(50) NOT NULL,
                status VARCHAR(50) DEFAULT 'active',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId1) REFERENCES users(id),
                FOREIGN KEY (userId2) REFERENCES users(id)
            )
        `);

        // Tabla de mensajes
        await connection.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                conversationId INT NOT NULL,
                senderId INT NOT NULL,
                text TEXT NOT NULL,
                read BOOLEAN DEFAULT FALSE,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (conversationId) REFERENCES conversations(id),
                FOREIGN KEY (senderId) REFERENCES users(id)
            )
        `);

        console.log('✅ Tables created successfully');
    } catch (error) {
        console.error('❌ Error creating tables:', error.message);
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    connectDB,
    createTables
};
