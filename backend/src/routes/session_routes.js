const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {

    let sql = `SELECT *
               FROM users
               WHERE user_mail = ? 
               AND user_pass = ?`;
    let values = [
        req.body.user,
        req.body.password
    ]
    connection.query(sql, values, (err, result, fields) => {
        if (err) {
            res.json({
                status: 'error',
                message: 'No es posible acceder en este momento'
            })
        } else {
            if (result.length == 1) {

                req.session.user = req.body.user;
                req.session.userId = result[0].user_id;
                res.json(
                {
                    status: 'ok',
                    message: 'sesion iniciada',
                    loggedUser: 
                    {
                        id: req.session.userId,
                        nombre: result[0].user_mail
                    }
                }
                )
            }else{
                res.json({
                    status: 'error',
                    message: 'usuario y/o contraseña incorrectos'
                });
            }
        }
    })
})


router.delete('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({
                status: 'error',
                message: 'error al cerrar sesion'
            })
        } else {
            res.clearCookie('mr.admin');
            res.json({
                status: 'ok',
                message: 'sesion cerrada'
            })
        }
    })
})

module.exports = router;
