const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
