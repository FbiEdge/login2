const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// "Banco de dados" em memória (na variável users)
let users = [];

// POST /api/users
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o email já existe
        const userExistente = users.find(user => user.email === email);
        if (userExistente) {
            return res.status(400).json({ msg: 'Email já em uso' });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(password, salt);

        // Adicionar usuário ao array
        const novoUsuario = { email, password: senhaHash };
        users.push(novoUsuario);

        res.status(201).json({ msg: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;
