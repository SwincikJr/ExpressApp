var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const dbHost = 'mongodb://localhost:27017';
const dbName = 'myDB';

/* GET names page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(dbHost, function (error, client) {
        if (!error)
        {
            const db = client.db(dbName);
            db.collection('peoples').find({}).toArray(function(err, result){
                if (!err)
                {
                    client.close();
                    res.render('names', { pessoas: result });
                }
                else
                {
                    client.close();
                    res.send('Erro de consulta...');
                }
            });
        } 
        else 
        {
            res.send('Erro de conexão com o banco de dados...');
        }
    });
});

module.exports = router;