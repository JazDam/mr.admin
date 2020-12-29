const mysql = require('mysql');
let connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'admin_presupuesto_personal'
    }
)

connection.connect(
    err =>{
        if(err) throw err;
        console.log('conectado');
    }
)
module.exports = connection;