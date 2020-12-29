const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.get('/', (req, res) =>{
    
    let sql = `SELECT type_id AS id, type
               FROM type`;
    connection.query(sql, function(err, result, fields){

        if(err) throw err;
        res.json(result);
    })
})

module.exports = router;