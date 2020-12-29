const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.get('/user/:id',(req, res) =>{
    
    let sql = `SELECT op_id AS id, op_concept AS concept, op_amount AS amount, op_date AS date, type_id AS tipo, category_id AS category 
    FROM operations`;

    let where = '';
    let orderBy = ' ORDER BY date DESC LIMIT 10';
    
    if(req.query.category){
        where = where == '' ? ' WHERE ' : ' AND ';
        where += ' category_id = ' + req.query.category;
    }
    if(req.query.type){
        where += where == '' ? ' WHERE ' : ' AND ';
        where += ' type_id = ' + req.query.type;
    }
    if(req.params.id){
        where += where == '' ? ' WHERE ' : ' AND ';
        where += ' user_id = ' + req.params.id
    }

    sql += where;
    sql += orderBy;


    connection.query(sql, function(err, result, fields){
        if(err) throw err;
        res.json(result);
    })
})

router.get('/:id',(req, res) =>{

    let sql = `SELECT op_id AS id, op_concept AS concept, op_amount AS amount, op_date AS date, type_id AS tipo, category_id AS category
    FROM operations
    WHERE op_id = ${req.params.id}`;
    connection.query(sql, function(err, result, fieds){
        if(err) throw err;
        res.json(result[0]);
    })
})

router.post('/', (req, res) =>{

    let sqlInsert = `INSERT INTO operations(op_concept, op_amount, op_date, type_id, category_id, user_id)
                      VALUES(
                          '${req.body.operationConcept}',
                          ${req.body.operationAmount},
                          '${req.body.operationDate}',
                          ${req.body.operationType},
                          ${req.body.operationCategory},
                          ${req.session.userId}
                      )`;
    connection.query(sqlInsert, function(err, result, fields){
        if(err){
            res.json(
                {
                    status: 'error',
                    message: 'Error al agregar operación'
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message: 'Operación agregada'
                }
            )
        }
    })
})

router.put('/:id', (req, res) =>{

    let sqlUpdate = `UPDATE operations
                      SET op_concept = ?,
                      op_amount = ?, 
                      op_date = ?, 
                      category_id = ?
                      WHERE op_id = ?`;
    let values = [
        req.body.operationConcept,
        req.body.operationAmount,
        req.body.operationDate,
        req.body.operationCategory,
        req.params.id
    ];
                      
    connection.query(sqlUpdate, values, function(err, result, fields){
        if(err){
            res.json(
                {
                    status: 'error',
                    message: 'Error al modificar operación'
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message: 'Operación modificada'
                }
            )
        }
    })
})

router.delete('/:id', (req, res)=>{

    let sqlDelete = `DELETE FROM operations
                     WHERE op_id = ?`;
    let values = [req.params.id];

    connection.query(sqlDelete, values, (err, result, fields)=>{
        if(err){
            res.json(
                {
                    status: 'error',
                    message: 'error al eliminar'
                }
            )
        }else{
            res.json(
                {
                    status: 'ok',
                    message: 'Operación eliminada'
                }
            )
        }
    })
})
module.exports = router;