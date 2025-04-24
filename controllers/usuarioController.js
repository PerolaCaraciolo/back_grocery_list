const Usuario = require('../models/usuarioModel');

// Cadastrar usuário
exports.registrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ mensagem: "Email já cadastrado." });
        }

        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao registrar.", erro: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Informe email e senha." });
    }

    try {
        const usuario = await Usuario.findOne({ email, senha });
        if (!usuario) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." });
        }

        res.status(200).json({ mensagem: "Login realizado com sucesso!", usuarioId: usuario._id, nome: usuario.nome });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro ao fazer login.", erro: err.message });
    }
};
