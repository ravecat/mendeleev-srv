import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../app';

dotenv.config();

// TODO Use db from test environment
describe('API /api/elements', function () {
  beforeAll(() => {
    const { DB_HOST, DB_NAME } = process.env;
    
    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true });
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
