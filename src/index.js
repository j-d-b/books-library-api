const express = require('express');
const bodyParser = require('body-parser');

const getBookList = require('./getBookList');

const app = express();
const bookList = [];

app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const newBook = req.body.book;

  if (bookList.includes(newBook)) {
    // TODO send 400 status
    throw new Error('Duplicate book: That book already exists in the library');
  }

  bookList.push(newBook);
  res.send({ book: newBook });
});

app.get('/books', (req, res) => {
  getBookList(bookList, i, books => res.send(books));
});

app.listen(3000, () => console.log('Books library running ✨'));
