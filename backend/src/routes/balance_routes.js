const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/user/:id', (req, res) =>{

    let sql = `SELECT (SELECT SUM(op_amount) 
     FROM operations 
     WHERE type_id = 1 AND user_id = ${req.params.id}) - (SELECT SUM(op_amount)  
     FROM operations WHERE type_id = 2 AND user_id = ${req.params.id}) AS result`;

    
    connection.query(sql, function(err, result, fields){
        if(err) throw err;
            res.json(result[0]);
    })
    
})

router.get('/graph/user/:id', (req, res) =>{

    let sql = `SET lc_time_names = 'es_AR'`;

    connection.query(sql, function(err, result, fields){
        if(err) throw err;

        let sql = `SELECT MONTHNAME(op_date) AS month, COUNT(*) AS quantity
                   FROM operations
                   WHERE user_id = ${req.params.id}
                   GROUP BY EXTRACT(MONTH FROM op_date)`;

        connection.query(sql, function(err, result, fields){

            if(err) throw err;
            res.json(result);
        })

    })
    
})

module.exports = router;