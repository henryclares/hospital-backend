/**
 * Path. ''api/login
 * 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();

router.post('/',[
    check('email','El nombre es obligatorio').isEmail(),
    check('password','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],login);

module.exports = router;