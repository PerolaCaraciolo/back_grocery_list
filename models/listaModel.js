// PRIMEIRO QUE EU VOU MEXER, APÓS INICIAR O NPM E ADICIONAR MINHAS DEPENDÊNCIAS

const mongoose = require('mongoose');                       // Importo meu ORM

const ListaSchema = new mongoose.Schema({                   // Crio o Schema de Lista, as características das minhas listas
    // Aqui dentro eu vou passar os atributos que minha lista precisa ter!
    nomeLista: { type: String, required: true, trim: true },     // Tipo, se é obrigatorio e exclusão de espaços desnecessários no início e no fim
    dataCriacao: { type: Date, default: Date.now },         // Definindo automático minha data de criação
    itens: [{ 
        nomeProduto: { type: String, required: true }, 
        quantidade: { type: Number, required: true, min: 1 }, 
        preco: { type: Number, required: false, min: 0 }, 
        total: { type: Number, required: false }
    }],
    favorita: { type: Boolean, default: false },
    localizacao: {                                          // Required = false pq depende do usuário permitir o acesso
        latitude: { type: Number, required: false }, 
        longitude: { type: Number, required: false } 
        // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }              // Relação com a minha outra tabela / com a outra entidades
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Lista', ListaSchema);      // Exporto o meu modelo