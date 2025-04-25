// SEGUNDO QUE EU VOU MEXER

const Lista = require('../models/listaModel');      // Importo o meu modelo
const mongoose = require("mongoose");

exports.getAllListas = async (req, res) => {        // BUSCA todas as Listas cadastradas no meu banco e trazer
    const { usuarioId } = req.query;

    if (!usuarioId) {
        return res.status(400).json({ mensagem: "Usuário não informado." });
    }

    try {
        const listas = await Lista.find({ usuarioId });          // Busca aqui no ".find()"...
        res.json(listas);                           // ...e devolve aqui
    } catch (err) {                                 // Mas se der algum erro, entra aqui...
        res.status(500).json({ message: err.message});
    }
};

exports.createLista = async (req, res) => {        // CADASTRA uma lista no banco
    const { nomeLista, itens, favorita, localizacao, usuarioId } = req.body;         // Busca os dados (os atributos) que tão vindo do meu front, do corpo dele (não precisa colocar se o REQUIRED no MODEL foi FALSE)
    const novaLista = new Lista ({                 // Instancio esse novo objeto
        nomeLista, 
        itens: itens.map(item => ({
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade || 1,                    // Se n for informado, assume 1
            preco: item.preco || 0,
            total: (item.quantidade || 1) * (item.preco || 0)
        })),
        favorita: favorita || false,               // Se n for enviado, assumo false
        localizacao: localizacao || null,           // Se não houver, mantém como null
        usuarioId: mongoose.Types.ObjectId(usuarioId)
    });
                                                                    // (???????????????)
    // Validação básica    (AVALIAR SE EU PRECISO MESMOOOOO, CONSIDERANDO QUE JÁ TÔ TRATANDO QUANDO RECEBO O DADO!)
    if (!nomeLista || !itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ err: 'O nome da lista e pelo menos um item são obrigatórios.' });
    }

    // Salva no banco de dados
    try {
        const savedLista = await novaLista.save();                 // Com esse SAVE, eu cadastro esse Objeto novo
        res.status(201).json(savedLista);                           // Ele trás a impressão da lista criado
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateLista = async (req, res) => {
    try {
        const updatedLista = await Lista.findByIdAndUpdate(req.params.id, req.body, { new: true });     // Sendo assim, eu TENHO que receber qual o ID e qual o Objeto que será alterado pro ".findByIdAndUpdate" funcionar.
        res.json(updatedLista);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLista = async (req, res) => {
    try {
        await Lista.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lista deletada com sucesso' })
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.getListaById = async (req, res) => {
    try {
        const lista = await Lista.findById(req.params.id);
        if (!lista) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        res.json(lista);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};