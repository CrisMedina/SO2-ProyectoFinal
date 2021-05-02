var express = require('express');
var router = express.Router();
var sql = require('mssql');
const dateTime = require('node-datetime');

var config = {
    user: 'admin',
    password: '107990$$',
    server: 'sql-server-2017.ce8ekhcwshe3.us-west-2.rds.amazonaws.com',
    port: 1433,
    database: 'pract3',
    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

//Devuelve todos las transferencias
//http://127.0.0.1:3000/transferencias
router.get('/', function(req, res, next) {
    sql.connect(config, function(err) {
        if (err) console.log(err);

        var request = new sql.Request();

        request.query(`select * from transferencia`, function(err, data) {
            if (err) {
                res.json(false);
            } else {
                res.json(data.recordset);
            }
        });
    });
});

//Crea una nueva transferencia
router.post('/', function(req, res, next) {
    //console.log(req.body)
    sql.connect(config, function(err) {
        if (err) console.log(err);

        var request = new sql.Request();
        var fechaHora = new Date();
        let date = dateTime.create();
        let fecha = date.format('Y-m-d H:M:S');


        query = `
        INSERT INTO transferencia (id_usuario_envia, id_usuario_recibe,fecha, monto) 
          VALUES ('${req.body.id_usuario_envia}','${req.body.id_usuario_recibe}','${fecha}','${req.body.monto}');
      `;

        request.query(query, function(err) {
            if (err) {
                console.log(err);
                res.json(false);
            } else {
                res.json(true);
            }
        });
    });
});

// obtener tranferencias por usuario
//http://127.0.0.1:3000/transferencias/id
router.get('/:id', function(req, res, next) {
    sql.connect(config, function(err) {
        if (err) console.log(err);

        var request = new sql.Request();

        query = `SELECT t.id_usuario_envia, t.id_usuario_recibe, 
            CONVERT(varchar, t.fecha, 103) as fecha, 
            CONVERT(varchar, t.fecha, 8) as hora, 
            monto, 
            u.saldo_inicial as saldo,
            (SELECT no_cuenta FROM usuario WHERE id = t.id_usuario_envia) as envia,
            (SELECT no_cuenta FROM usuario WHERE id = t.id_usuario_recibe) as recibe
        FROM transferencia t, usuario u
        WHERE (t.id_usuario_envia = ${req.params.id} OR t.id_usuario_recibe = ${req.params.id})
        AND u.id = ${req.params.id}
        ORDER BY t.id DESC`;

        request.query(query, function(err, data) {
            if (err) {
                res.json(false);
            } else {
                res.json(data.recordset);
            }
        });
    });
});

module.exports = router;