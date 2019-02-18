// simulated database query
const getBook = (bookList, index, callback) => {
  setTimeout(() => callback(bookList[index]), Math.random() * 200);
};

const getBookList = (bookList, index = 0, callback) => {
  const isLastBook = index + 1 === bookList.length;

  const book = getBook(bookList, index, book => {
    if (isLastBook) {
      callback(book);
    } else {
      getBookList(bookList, ++index, nextBook => {
        callback(book + ', ' + nextBook);
      });
    }
  });
};

module.exports = getBookList;
