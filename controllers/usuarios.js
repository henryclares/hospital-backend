const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')
const getusuario = async (req, res) => {
  const usuario = await Usuario.find({}, 'nombre email role');
  res.json({
    ok: true,
    usuario,
    uid: req.uid
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password, nombre } = req.body;
  
  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      })
    }

    const usuario = new Usuario(req.body);
    
    //encriptar  contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar usuario   
    const user = await usuario.save();

    const token = await generarJWT(user.id);
    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs',
    });
  }
};
const actualizarusuario = async (req,res = response)=>{
  //TODO: validr token y comprobar si es el usuario correcto
  const uid = req.params.id
  
  try {

    const existeusuarioDB = await Usuario.findById(uid);

    if (!existeusuarioDB){
      return res.status(404).json({
        ok:false,
        msg: 'No existe un usuario por ese id'
      })
    }
    const {password,google,email,...campos} = req.body;

    if (existeusuarioDB.email != email) {      
      const existeEmail = await Usuario.findOne({email});
      if (existeEmail){
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario por ese email'
        })
      }
    }
    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


    res.json({
      ok:true,
      usuario:usuarioActualizado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
};
const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id
  try {

    const existeusuarioDB = await Usuario.findById(uid);

    if (!existeusuarioDB){
      return res.status(404).json({
        ok:false,
        msg: 'No existe un usuario por ese id'
      })
    }

    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok:true,
      msg: 'Usuario eliminado'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
}
module.exports = {
  getusuario,
  crearUsuario,
  actualizarusuario,
  borrarUsuario
};
