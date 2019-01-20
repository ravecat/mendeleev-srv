import request from 'supertest';
import app from '../../app';

describe('API /api', function () {
  it('GET /', function (done) {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Return 404 for non-existing route', function (done) {
    request(app)
      .get('/non-existing')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
