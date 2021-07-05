/**
HOSPITALES 
ruta: * /api/medicos
 */

const { Router } = require('express');
const { check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { 
    getMedicos,
    crearMedico,
    actualizarMedicos,
    borrarMedicos,
} = require('../controllers/medicos')

const router = Router();

router.get('/',getMedicos );
router.post('/',[
    validarJWT,
    check('nombre','El nombre del Medico es necesario').not().isEmpty(),
    check('hospital','El id del Hospital debe ser valido').isMongoId(),
    validarCampos,
],crearMedico );

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre del Medico es necesario').not().isEmpty(),
    check('hospital','El id del Hospital debe ser valido').isMongoId(),
    validarCampos,
],actualizarMedicos );

router.delete('/:id',borrarMedicos );

module.exports = router;