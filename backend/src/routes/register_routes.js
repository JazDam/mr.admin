const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) =>{
    
    console.log(req.body);

    let sqlRegister = `INSERT INTO users(user_mail, user_pass)
                       VALUES(
                           '${req.body.userEmailRegister}',
                           '${req.body.passwordRegister}'
                       )`;
    connection.query(sqlRegister, function(err, result, fields){
        if(err){console.log('error')};

        res.send(
            {
                status: 'ok',
                message: 'Registro con éxito!'
            }
        )
    })
  
})

module.exports = router;