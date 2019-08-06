import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { Elements } from '../../models';
import element from './element.json';

chai.use(chaiHttp);
chai.should();

describe('API/api/elements', function() {
  beforeEach(function(done) {
    Elements.deleteMany({}, err => {
      done();
    });
  });
  it('GET/api/elements Get element list', function(done) {
    chai
      .request(app)
      .get('/api/elements')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('POST/api/elements Create element successfully', done => {
    chai
      .request(app)
      .post('/api/elements')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('symbol');
        done();
      });
  });

  it('GET/api/elements/:id Get element by atomic number', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/api/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('symbol');
          res.body.should.have.property('atomic_number').eql(element.atomic_number);
          done();
        });
    });
  });

  it('PUT/api/elements/:id Update element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .put(`/api/elements/${data._id}`)
        .send({ ...data._doc, name: 'Updated' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('symbol');
          res.body.should.have.property('name').eql('Updated');
          done();
        });
    });
  });

  it('DELETE/api/elements/:id Delete element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .delete(`/api/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(`${data._id}`);
          done();
        });
    });
  });
});
