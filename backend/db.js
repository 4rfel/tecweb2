var mysql = require('mysql');
//npm run dev

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'gioiaGGR1',
    database : 'projeto2'
    })
    
    // connection.connect();

    function login ({usuario, senha}, callback) {
    
    connection.query('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?;', [usuario,senha], function (error,
        results) {
        if (error) throw error;
        return callback(results[0].usuario);
        });


}

function signup (param, callback) {

    connection.query('INSERT INTO usuarios set ?;',param, function (error,
        results, fields) {
            if (error) throw error;
            return callback(null);
        });
}

module.exports = {login, signup}