# LingoPair 🌍

Una plataforma para conectar a personas que quieren aprender idiomas a través de conversaciones auténticas.

## Características

- 🎯 **Emparejamiento inteligente**: Conecta usuarios que desean aprender el mismo idioma
- 💬 **Chat en tiempo real**: Comunicación directa entre compañeros de idioma
- 📊 **Seguimiento de progreso**: Gamificación con XP, racha diaria y niveles
- 🌐 **Multiidioma**: Soporte para español, inglés, francés y más
- 👥 **Comunidad activa**: Leaderboard y recomendaciones de compañeros

## Tecnología

### Frontend
- HTML5, CSS3, JavaScript
- Responsive Design
- Internacionalización (i18n)

### Backend
- Node.js + Express
- MySQL para base de datos
- JWT para autenticación
- Bcrypt para seguridad de contraseñas

## Instalación

### Requisitos previos
- Node.js v14 o superior
- MySQL 5.7 o superior
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/guillemguti86/joinlingopair.git
cd joinlingopair
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```
Edita `.env` con tus configuraciones.

4. **Inicializar la base de datos**
```bash
npm run db:init
```

5. **Ejecutar el servidor**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Estructura del proyecto

```
joinlingopair/
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── css/
│   │   ├── styles.css
│   │   └── dashboard.css
│   └── js/
│       ├── main.js
│       ├── dashboard.js
│       └── i18n.js
├── routes/
│   ├── auth.js
│   ├── api.js
│   └── chat.js
├── models/
│   ├── User.js
│   └── Conversation.js
├── config/
│   └── database.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Scripts disponibles

```bash
npm start           # Iniciar servidor en producción
npm run dev         # Iniciar servidor en desarrollo con nodemon
npm run db:init    # Inicializar base de datos
npm test           # Ejecutar pruebas
```

## API Endpoints

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/logout` - Cerrar sesión

### API
- `GET /api/users` - Obtener lista de usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `GET /api/conversations` - Obtener conversaciones del usuario
- `GET /api/leaderboard` - Obtener leaderboard

### Chat
- `GET /chat/messages/:conversationId` - Obtener mensajes
- `POST /chat/messages` - Enviar mensaje
- `PUT /chat/messages/:messageId/read` - Marcar como leído

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## Contacto

- **Autor**: Guillermo Guti
- **Email**: guillemguti@gmail.com
- **GitHub**: [@guillemguti86](https://github.com/guillemguti86)

---

Hecho con ❤️ para aprender idiomas
