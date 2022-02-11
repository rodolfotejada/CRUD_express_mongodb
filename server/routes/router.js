const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

// ROOT route - Method: GET
route.get('/', services.homeRoutes);

// ADD_USER route - Method: GET
route.get('/add_user', services.add_user);

// UPDATE_USER route - Method: GET
route.get('/update_user', services.update_user);

//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;
