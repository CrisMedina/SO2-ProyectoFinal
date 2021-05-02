var express = require('express');
var router = express.Router();
var sql = require('mssql');


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

//Devuelve todos los usuarios
router.get('/', function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    request.query(`select * from usuario`, function (err, data) {
      if (err) {
        res.json(false);
      } else {
        res.json(data.recordset);
      }
    });
  });
});

//Envia true si el usuario de acuerdo al id recibido existe
router.get('/:no_cuenta', function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    query = `
      SELECT * FROM usuario u
            WHERE u.no_cuenta = '${req.params.no_cuenta}';
    `;
    request.query(query, function (err, data) {
      if (err) {
        res.json(false);
      } else {
        if (data.recordset.length > 0) {
          res.json(false);
        } else {
          res.json(true);
        }
      }
    });
  });
});

//Método para hacer login
router.get('/login/:cuenta&:clave', function (req, res, next) {
  //console.log(req.params)
  sql.connect(config, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    query = `
      SELECT * FROM usuario AS u
              WHERE u.no_cuenta = '${req.params.cuenta}'
              AND u.clave = '${req.params.clave}'
    `;
    console.log(query);
    request.query(query, function (err, data) {
      console.log(data.recordset.length);
      if (data.recordset.length > 0) {
        res.json(data.recordset);
      } else {
        res.json(false);
      }
    });
  });
});

function getUserCode(dpi) {
  return dpi.substring(5, 10)
}

//Crea un nuevo usuario.
router.post('/', function (req, res, next) {
  completado = false;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();
    var codigo = getUserCode(req.body.dpi)

    query = `
      INSERT INTO usuario (nombres, apellidos, dpi, no_cuenta, saldo_inicial, correo, clave, codigo)
        VALUES ('${req.body.nombres}', '${req.body.apellidos}', '${req.body.dpi}', '${req.body.no_cuenta}',${req.body.saldo_inicial}, '${req.body.correo}', '${req.body.clave}', '${codigo}');
    `;

    request.query(query, function (err) {
      if (err) {
        console.log(err);
        res.json(false);
      } else {
        res.json(codigo);
      }
    });
  });
});

//Actualiza el usuario
router.put('/:username', function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();

    query = `
      UPDATE usuario
        SET username = '${req.body.username}',
            nombre = '${req.body.nombre}'
              WHERE username = '${req.params.username}'
    `;

    request.query(query, function (err) {
      if (err) {
        complete = false;
      } else {
        complete = true;
      }
    });

    query = `
      SELECT u.username, u.nombre, f.url as url_foto
        FROM usuario AS u
          INNER JOIN album AS a ON a.usuario = u.username
          INNER JOIN foto AS f ON f.album = a.id
            WHERE a.tipo_album = 1
              AND f.perfil = 1
              AND u.username = '${req.params.username}'
    `;

    request.query(query, function (err, data) {
      if (err) {
        res.json(false);
      } else {
        console.log(data.recordset);
        res.json(data.recordset);
      }
    });
  });
});

//Método para hacer login
router.post('/loginFoto', async function (req, res, next) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      query = `
    SELECT u.username, u.nombre, f.url as url_foto
        FROM usuario AS u
          INNER JOIN album AS a ON a.usuario = u.username
          INNER JOIN foto AS f ON f.album = a.id
            WHERE a.tipo_album = 1
              AND f.perfil = 1
    `;

      request.query(query, async function (err, data) {
        
        if (data.recordset.length > 0) {
          var foto = (req.body.foto).replace(/^data:image\/[a-z]+;base64,/, '');
          var foto64 = new Buffer.from(foto, 'base64');
          for (let i = 0; i < data.recordset.length; i++) {
            
            var url_foto = data.recordset[i].url_foto;
            let image = await axios.get(url_foto, {
              responseType: "arraybuffer",
            });
            let imagen64 = Buffer.from(image.data, "base64");
          
              
            let params = {
              SourceImage: { Bytes: foto64 },
              TargetImage: { Bytes: image },
              SimilarityThreshold: "80",
            }

            let comparacion = ( await rekognition.compareFaces(params).promise()).FaceMatches;
            if (comparacion.length > 0) {
              console.log('llego aqui ' + data.recordset[i].username);
              
              var r = data.recordset[i];
              
              console.log(r)
              return res.json(r);
              //return res.json({ username: data.recordset[i].username })
            }
          
          }
          console.log('No se encontro datos');
          return res.json([]);
        } else {
          console.log('Hubo un error');
          return res.json([]);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.json([]);
  }
});

//Envia el id del usuario de acuerdo al numero de cuenta
router.get('/getIdUser/:no_cuenta', function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    query = `
      SELECT * FROM usuario u
            WHERE u.no_cuenta = '${req.params.no_cuenta}';
    `;
    request.query(query, function (err, data) {
      if (err) {
        return res.send({
          status: 400,
          msg : e
        })
      } else {
        if (data.recordset.length > 0) {
          //console.log(data.recordset[0].id)
          return res.send({
            status: 200,
            id: data.recordset[0].id,
            saldo: data.recordset[0].saldo_inicial
          })
        } else {
          return res.send({
            status: 400
          })
        }
      }
    });
  });
});

//Actualizar saldo
router.put('/', function (req, res, next) {
  console.log(req.body)
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    query = `
      SELECT * FROM usuario u
            WHERE u.id = '${req.body.id}';
    `;
    request.query(query, function (err, data) {
      if (err) {
        res.json(false);
      } else {
        if (data.recordset.length > 0) {

          //Editar saldo
          sql.connect(config, function (err) {
            if (err) console.log(err);
        
            var request = new sql.Request();
            var nuevoSaldo = data.recordset[0].saldo_inicial + req.body.monto; 
        
            query = `
              UPDATE usuario
                SET saldo_inicial = '${nuevoSaldo}'
                      WHERE id = '${req.body.id}'
            `;
        
            request.query(query, function (err) {
              if (err) {
                res.json(false);
              } else {
                res.json(true);
              }
            });
          });
        } else {
          res.json(false);
        }
      }
    });
  });
});


module.exports = router;
