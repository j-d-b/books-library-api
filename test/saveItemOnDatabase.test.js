const saveItemOnDatabase = require('../lib/saveItemOnDatabase');

test('passes object with book/time key/value pair to callback', done => {
  const callback = data => {
    expect(Object.keys(data)).toContain('Test Book');
    expect(data['Test Book']).toBeGreaterThanOrEqual(0);
    done();
  }

  saveItemOnDatabase('Test Book', callback);
});
