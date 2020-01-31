const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController')

// Rotas CRUD
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

// Rota Calculo
routes.get('/products/tarifa-normal/:id/:tempo?/:plano?', ProductController.calculo);


module.exports = routes;
