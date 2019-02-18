const getBookList = require('../lib/getBookList');

test('passes comma-separated list to callback', done => {
  const testBookList = ['a', 'b', 'c'];
  const callback = data => {
    expect(data).toBe('a, b, c');
    done();
  }
  getBookList(['a', 'b', 'c'], 0, callback);
});
