import mongoose from 'mongoose';
import request from 'supertest';
import config from '../../config';
import app from '../../app';

// TODO Use db from test environment
describe('API /api/elements', function () {
  beforeAll(() => {
    const { databaseName, databaseHost } = config;

    mongoose.connect(`mongodb://${databaseHost}/${databaseName}`, { useNewUrlParser: true });
  });

  it('GET element list', function (done) {
    request(app)
      .get('/api/elements')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
          if (err) return done(err);

          done();
      });
  });
  
  afterAll(done => {
    mongoose.disconnect(done);
  });
});
