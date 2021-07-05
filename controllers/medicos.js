const { response } = require('express')
const Medico = require('../models/medico') 
const getMedicos = async (req,res = response) => {
    
    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req,res = response) => {
    
    const uid = req.uid
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    console.log(medico)
    try {
    
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medicoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }
    
}
const actualizarMedicos = async (req,res = response) => {
    const id = req.params.id
    const uid = req.uid

    try {
        const medico = await Medico.findById(id)
        if(!medico){
           return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})

        res.json({
            ok: true,
            msg: 'actualizarMedicos',
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
      
   
}

const borrarMedicos = async (req,res = response) => {
    const id = req.params.id

    try {
        const medico = await Medico.findById(id)
        if(!medico){
           return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }
      await Medico.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Medico ELiminado',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedicos,
    borrarMedicos,
}