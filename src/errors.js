module.exports = {
  BookNotFoundError: new Error('Not Found: Book does not exist in the library'),
  DuplicateBookError: new Error('Duplicate Book: That book already exists in the library')
};
