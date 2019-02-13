const express = require('express');
const bodyParser = require('body-parser');

const getBookList = require('./getBookList');

const app = express();
let bookList = [];

app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const newBook = req.body.book;

  if (bookList.includes(newBook)) {
    res.status(400);
    throw new Error('Duplicate Book: That book already exists in the library');
  }

  bookList = [...bookList, newBook];
  res.send({ book: newBook });
});

app.delete('/books', (req, res) => {
  const bookToDelete = req.body.book;

  if (!bookList.includes(bookToDelete)) {
    res.status(400);
    throw new Error('Not Found: Book does not exist in the library');
  }

  bookList = bookList.filter(book => book !== bookToDelete);
  res.status(204).send();
});

app.patch('/books', (req, res) => {
  const { originalBook, newBook } = req.body;

  if (!bookList.includes(originalBook)) {
    res.status(400);
    throw new Error('Not Found: Book does not exist in the library');
  }
  if (bookList.includes(newBook)) {
    res.status(400);
    throw new Error('Duplicate Book: That book already exists in the library');
  }

  bookList = bookList.map(book => book === originalBook ? newBook : book);
  res.status(204).send();
});

app.get('/books', (req, res) => {
  getBookList(bookList, i, books => res.send(books));
});

app.listen(3000, () => console.log('Books library running ✨'));
