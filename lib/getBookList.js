// simulated database query
const getBook = (bookList, index, callback) => {
  setTimeout(() => callback(bookList[index]), Math.random() * 200);
};

const getBookList = (bookList, index = 0, callback) => {
  const book = getBook(bookList, index, book => {
    if (index + 1 === bookList.length) {
      callback(book);
    } else {
      getBookList(bookList, ++index, nextBook => {
        callback(book + ', ' + nextBook);
      });
    }
  });
};

module.exports = getBookList;
