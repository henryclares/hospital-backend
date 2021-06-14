const getusuario = (req, res) => {
  res.json({
    ok: true,
    msg: 'Get Usuarios'
  });
};

const crearUsuario = (req, res) => {
    
    const {email,password, nombre} = req.body;
    
    res.json({
      ok: true,
      msg: 'Creando Usuario'
    });
  };
  

module.exports = {
    getusuario,
    crearUsuario
}