// 1. One of the things here is to install mongodb and connect to database
//use tmplate engine to generate html with ajax database


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const BookSchema = require('./bookSchema')

const app = express();
const port = 8000;
let db;

//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

app.use(bodyParser.urlencoded({encode: true, extended: true}));
app.use(express.static('public'));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

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
  db.collection('book').find().toArray((err, result) => {
    res.render('index.ejs', {titles: result});
    console.log(result);
  });

});

app.post('/titles', (req, res) => {
  const book = new BookSchema;
  book.title = req.body.title;
  book.description = req.body.description;

  db.collection('book')
    .save(book, (err, result) => {
      if (err) {
        return console.log(err)
      }

      console.info('saved to database');
      res.redirect('/')
  })
});

app.put('/titles', (req, res) => {
  db.collection('book').findOneAndUpdate({
    title: 'Olaolaola'
  },{
    $set: {
      title: req.body.title,
      description: req.body.description
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, response) => {
    if(err) {
      return res.send(err)
    }
    res.sent(response);
  })
});
