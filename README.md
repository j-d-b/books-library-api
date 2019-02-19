# Books Library API
A simple REST API for a library of books, using Express.

**Note:** the `booksList` variable in `app.js` stores all books and is not persisted.

The `GET` and `PUT` requests use `setTimeout` to simulate asynchronous calls (and add complexity, for the sake of coding examples!);

## Usage
Install dependencies
```
npm i
```

Start the server
```
npm run start
```

### Development
```
npm run develop
```

To start the server using `nodemon`, which will reload the server when files are changed.

## Testing
The tests for this project are basic include two unit tests and a higher-level test of functionality on the running server, in `test/app.test.js`.;

All tests are located in `tests/`.

Run all tests with
```
npm run test
```

## API
* `POST` `/books`: add a book to the library by name `{ "book": "My New Book" }`
* `DELETE` `/books/`: delete a book by name `{ "book": "My New Book" }`
* `PATCH` `/books`: update an existing book/change title `{ "originalBook": "My New Book", "newBook": "My Book, Forever" }`
* `GET` `/books`: response text is full list of books in the library, as comma-separated string
* `PUT` `/books`: simulate database persistence. Response contains a JSON object with `"<book_title>: <ms_to_persist>"` key-value pairs
