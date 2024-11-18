const express = require('express');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Usar JSON
app.use(express.json());

// "Banco de dados" simples em memória
let users = [];

app.use('/api/users', require('./routes/userRoutes'));

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
