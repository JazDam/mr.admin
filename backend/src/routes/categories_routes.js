const express = require('express');
const router = express.Router();
const connection = require('../connection');


router.get('/', (req, res) =>{
    
    let sql = `SELECT category_id AS id, category 
               FROM category
               ORDER BY category`;
    connection.query(sql, function(err, result, fields){

        if(err) throw err;
        res.json(result);
    })
})

module.exports = router;