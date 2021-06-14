const express =  require('express');
require('dotenv').config()
const {dbConnection} = require('./database/config');
// crear el servidor de express
const app = express();
const cors = require('cors');
// Configurar CORS
app.use(cors());
// Base de datos
dbConnection();
// Rutas
app.get('/', (req,res)=>{
    res.json({
        ok: true,
        msg: 'Hello world'
    })
});

app.listen(3004, () =>{
    console.log('Server run on port:'+process.env.PORT)
});
 