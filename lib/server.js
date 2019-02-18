const express = require('express');
const bodyParser = require('body-parser');

const { DuplicateBookError, BookNotFoundError } = require('./errors');
const getBookList = require('./getBookList');
const saveItemOnDatabase = require('./saveItemOnDatabase');

const app = express();
let bookList = [];

app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const newBook = req.body.book;

  if (bookList.includes(newBook)) {
    res.status(400);
    throw DuplicateBookError;
  }

  bookList = [...bookList, newBook];
  console.log('After POST: ' + bookList);
  res.send({ book: newBook });
});

app.delete('/books', (req, res) => {
  const bookToDelete = req.body.book;

  if (!bookList.includes(bookToDelete)) {
    res.status(400);
    throw BookNotFoundError;
  }

  bookList = bookList.filter(book => book !== bookToDelete);
  console.log('After DELETE: ' + bookList);
  res.status(204).send();
});

app.patch('/books', (req, res) => {
  const { originalBook, newBook } = req.body;

  if (!bookList.includes(originalBook)) {
    res.status(400);
    throw BookNotFoundError;
  }

  if (bookList.includes(newBook)) {
    res.status(400);
    throw DuplicateBookError;
  }

  bookList = bookList.map(book => book === originalBook ? newBook : book);
  console.log('After PATCH: ' + bookList);
  res.status(204).send();
});

app.get('/books', (req, res) => {
  getBookList(bookList, 0, books => res.send(books));
});

app.put('/books', (req, res) => {
  let bookTimePairs = {};
  let notDone = 0;
  bookList.forEach(book => {
    notDone++;
    saveItemOnDatabase(book, bookTimePair => {
      notDone--;
      bookTimePairs = {
        ...bookTimePairs,
        ...bookTimePair
      };
      if (!notDone) {
        res.send(bookTimePairs);
      }
    });
  });
});

app.listen(3000, () => console.log('Books library running ✨'));
