// TERCEIRO QUE EU VOU MEXER 

const express = require('express');
const router = express.Router();
const listasController = require('../controllers/listaController');

router.get('/', listasController.getAllListas);                  // Rota na raíz pra buscar os dados
router.get('/:id', listasController.getListaById);
router.post('/', listasController.createLista);                  // Rota para cadastrar um novo
router.put('/:id', listasController.updateLista);                // Para editar aquele no qual passei o id
router.delete('/:id', listasController.deleteLista);             // Para deletar aquele id específico

// Todas as rotas apontando para meu arquivo do controler e suas respectivas funções mapeadas direitinho!

module.exports = router;