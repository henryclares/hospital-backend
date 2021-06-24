const express =  require('express');
require('dotenv').config()
const {dbConnection} = require('./database/config');
// crear el servidor de express
const app = express();
const cors = require('cors');
// Configurar CORS
app.use(cors());
// Lectura y parseo del body 
app.use(express.json());
// Base de datos
dbConnection();
// Rutas

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


app.listen(process.env.PORT, () =>{
    console.log('Server run on port:'+process.env.PORT)
});
 