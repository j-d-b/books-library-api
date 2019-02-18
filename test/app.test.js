const request = require('supertest');
const app = require('../lib/app');

describe('Books library server', () => {
  // current bookList: []
  test('can add books', done => {
    request(app).post('/books').send({ book: 'Clamdigger\'s Paradise' }).then(res => {
      expect(res.statusCode).toBe(200);
      return request(app).post('/books').send({ book: 'Lemonad Daze' });
    }).then(res => {
      expect(res.statusCode).toBe(200);
      return request(app).post('/books').send({ book: 'Sandcrafter: Adventures' });
    }).then(res => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  // current bookList: ['Clamdigger's Paradise', 'Lemonad Daze', 'Sandcrafter: Adventures']
  test('can get all books as comma-separated list', done => {
    request(app).get('/books').then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Clamdigger\'s Paradise, Lemonad Daze, Sandcrafter: Adventures');
      done();
    });
  });

  // current bookList: ['Clamdigger's Paradise', 'Lemonad Daze', 'Sandcrafter: Adventures']
  test('cannot add duplicate books', done => {
    request(app).post('/books').send({ book: 'Clamdigger\'s Paradise' }).then(res => {
      expect(res.statusCode).toBe(400);
      return request(app).get('/books');
    }).then(res => {
      expect(res.text).toBe('Clamdigger\'s Paradise, Lemonad Daze, Sandcrafter: Adventures');
      done();
    });
  });

  // current bookList: ['Clamdigger's Paradise', 'Lemonad Daze', 'Sandcrafter: Adventures']
  test('can delete a book', done => {
    request(app).delete('/books').send({ book: 'Clamdigger\'s Paradise' }).then(res => {
      expect(res.statusCode).toBe(204);
      return request(app).get('/books');
    }).then(res => {
      expect(res.text).toBe('Lemonad Daze, Sandcrafter: Adventures');
      done();
    });
  });

  // current bookList: ['Lemonad Daze', 'Sandcrafter: Adventures']
  test('cannot delete a book that does not exist', done => {
    request(app).delete('/books').send({ book: 'Coffrin Agenda' }).then(res => {
      expect(res.statusCode).toBe(400);
      done();
    });
  });

  // current bookList: ['Lemonad Daze', 'Sandcrafter: Adventures']
  test('can patch a book', done => {
    request(app).patch('/books').send({ originalBook: 'Lemonad Daze', newBook: 'Lemonade Daze' }).then(res => {
      expect(res.statusCode).toBe(204);
      return request(app).get('/books');
    }).then(res => {
      expect(res.text).toBe('Lemonade Daze, Sandcrafter: Adventures');
      done();
    });
  });

  // current bookList: ['Lemonade Daze', 'Sandcrafter: Adventures']
  test('cannot patch a book name to one that already exists', done => {
    request(app).patch('/books').send({ originalBook: 'Lemonade Daze', newBook: 'Sandcrafter: Adventures' }).then(res => {
      expect(res.statusCode).toBe(400);
      return request(app).get('/books');
    }).then(res => {
      expect(res.text).toBe('Lemonade Daze, Sandcrafter: Adventures');
      done();
    });
  });

  // current bookList: ['Lemonade Daze', 'Sandcrafter: Adventures'];
  test('can simulate persistance: returns simulated persistence times', done => {
    request(app).put('/books').then(res => {
      const { body } = res;
      expect(body).toHaveProperty('Lemonade Daze');
      expect(body['Lemonade Daze']).toBeGreaterThanOrEqual(0);
      expect(body).toHaveProperty('Sandcrafter: Adventures');
      expect(body['Sandcrafter: Adventures']).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});
