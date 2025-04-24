// ÚLTIMO QUE EU VOU MEXER! LEMBRANDO DE CRIAR O ".ENV" PRA ESPECIFICAR MINHA VARIÁVEL DE AMBIENTE

// Esse é o meu arquivo pra subir meu servidor. Que vou juntar as coisas e subir.

// Importo as dependências principais do meu projeto:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();                                                 // Aqui ele tá importando e já chamando a função junto

const app = express();


//Middleware
app.use(cors());                                                            // Habilito o CORS no meu projeto, pra possibilitar de qualquer front-end consumir as rotas dessa API
app.use(bodyParser.json({ limit: '50mb' }));                                // Crio limitações básicas de recebimentos de dados, por ex, pra segurança da infraestrutura
app.use(bodyParser.urlencoded({ extended: true }));                         // Para dados enviados via URL encoded  (???)
// server.use(express.static('public'));


// // Conexão com o MongoDB
// mongoose.connect(process.env.MONGO_URI)                                     // Conecto com o MongoDB, buscando a strand  (??)  de conexão da minha variável de ambiente (do meu ".env")
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));


// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado ao MongoDB Atlas!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));


// Rotas
const listasRoute = require('./routes/listasRoutes');                       // Rotas de listas
app.use('/api/listasRoutes', listasRoute);                                  // A rota que eu vou usar lá no meu APP.JS do front

const usuarioRoutes = require('./routes/usuarioRoutes');                    // Rotas de usuário
app.use('/api/usuarios', usuarioRoutes);

// Porta. Iniciar servidor
const PORT = process.env.PORT || 3000;                                      // Aqui eu subo o meu servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));