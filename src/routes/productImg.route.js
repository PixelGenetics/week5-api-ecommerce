const { getAll,create,remove } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('e'), create)

routerProductImg.route('/:id')
    .delete(remove)

module.exports = routerProductImg;