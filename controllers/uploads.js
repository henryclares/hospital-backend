const path = require('path');
const fs = require('fs');

const { response } = require('express')

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')
const fileUpload = (req,res = response) => {


    const { tipo, id} = req.params
    const tiposValidos = ['hospitales','medicos','usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        })
    }
    //validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok:false,
            msg:'No hay ningun archivo'});
      }

    //procesar la imagen...

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensonArchivo =nombreCortado[nombreCortado.length-1]


    //validar extensio
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensonArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extension permitida'
        })
    }

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensonArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // sampleFile = req.files.sampleFile;
    // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  
    // mover la imagen
    file.mv(path, (err)=> {
      if (err){
          console.log(err)
          return res.status(500).json({
              ok:false,
              msg: 'Error al mover la imagen'
          });
      }
      actualizarImagen(tipo,id, nombreArchivo)
      res.json({
        ok:true,
        msg: 'Archivo Subido',
        nombreArchivo
    })
    });

    
};

const retornaImagen = (req,res = response) =>{
    const { tipo, foto} = req.params

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //imagen por defecto
    if (fs.existsSync(pathImg)){

        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
    
}

module.exports = {
    fileUpload,
    retornaImagen,
}