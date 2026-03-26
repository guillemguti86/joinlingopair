class User {
    constructor(id, email, name, password, language, level = 'A1') {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.language = language;
        this.level = level;
        this.xp = 0;
        this.dailyStreak = 0;
        this.totalXP = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Método para actualizar XP
    addXP(amount) {
        this.xp += amount;
        this.totalXP += amount;
        this.updatedAt = new Date();
    }

    // Método para incrementar racha diaria
    incrementStreak() {
        this.dailyStreak += 1;
        this.updatedAt = new Date();
    }

    // Método para resetear racha
    resetStreak() {
        this.dailyStreak = 0;
        this.updatedAt = new Date();
    }

    // Método para actualizar nivel
    updateLevel(newLevel) {
        this.level = newLevel;
        this.updatedAt = new Date();
    }

    // Método para obtener información del usuario
    getInfo() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            language: this.language,
            level: this.level,
            xp: this.xp,
            totalXP: this.totalXP,
            dailyStreak: this.dailyStreak,
            createdAt: this.createdAt
        };
    }
}

module.exports = User;
