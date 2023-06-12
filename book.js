const mysql = require('mysql2');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const {response, request} = require("express");
const {connect} = require("require/server");
const e = require("express");

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'comicbook',
    port : '3306',
});

const app = express();
app.use(bodyParser.urlencoded({
    extended : false,
}));

app.listen(3000, () => {
    console.log('Server is running port 3000!')

    connection.connect();
});

app.get('/', (request, response) => {
   fs.readFile('bookList.html', 'utf-8', (error, data) => {
       // select 쿼리문
       connection.query('select * from books', (error, results, fields) => {
          if(error) throw error;

          response.send(ejs.render(data, {
              data : results,
          }));
       });
   })
});

// create view
app.get('/create', (request, response) => {
   fs.readFile('insertBook.html', 'utf-8', (error, data) => {
      if(error) throw error;

      response.send(data);
   });
});

// create
app.post('/create', (request, response) => {
   const body = request.body;

   connection.query('INSERT INTO books (genre, name, writer, releasedate) value (?,?,?,?)'
       , [body.genre, body.name, body.writer, body.releasedate], () => {
       response.redirect(('/'));
       });
});

// update
app.get('/modify/:id', (request, response) => {
    fs.readFile('insertBook.html', 'utf-8', (error, data) => {
       connection.query('select * from books where number = ?', [request.params.id], (error, results) => {
          if(error) throw error;

          console.log(request.params.id);
          response.send(ejs.render(data, {
              data : results[0],
          }));
       });
    });
})

app.post('/modify/:id', (request, response) => {
   const body = request.body;
   connection.query('update books set genre=?, name=?, writer=? where number=?'
       , [body.genre, body.name, body.writer, request.params.id], (error, results) => {
       if(error) throw error;

       response.redirect('/');
       });
});

app.get('/delete/:id', (request, response) => {
   connection.query('delete from books where number = ?', [request.params.id], () => {
       response.redirect('/');
   })
});



