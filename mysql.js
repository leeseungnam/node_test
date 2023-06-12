// mysql 모듈 사용
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'comicbook',
    port : '3306',
});

connection.connect();

connection.query('select * from books'
    , (error, results, fields) => {

    if(error) throw error;

    console.log(results);
});

connection.end();