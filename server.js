// 1. One of the things here is to install mongodb and connect to database

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = 3000;
let db;

//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

app.use(bodyParser.urlencoded({encode: true, extended: true}));

MongoClient.connect('mongodb://o.gutkowska:jonaszkofta1@ds147520.mlab.com:47520/book', (err, res) => {
  if(err) {
    return console.error(err);
  }
  db = res;
  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html')
});

app.post('/titles', (req, res) => {
  db.collection('titles')
    .save(req.body, (err, result) => {
      if (err) {
        return console.log(err)
      }

      console.log('saved to database');
      res.redirect('/')
  })
});
