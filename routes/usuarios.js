const { Router } = require('express');
const {getusuario,crearUsuario} = require('../controllers/usuarios')

const router = Router();

router.get('/',getusuario );
router.post('/',crearUsuario );

module.exports = router;