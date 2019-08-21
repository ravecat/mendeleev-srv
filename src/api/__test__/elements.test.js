import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { Elements } from '../../models';

chai.use(chaiHttp);
chai.should();

describe('API/elements', function() {
  var element;

  before(function(done) {
    element = JSON.parse(require('fs').readFileSync(`${__dirname}/data.json`));

    done();
  });

  beforeEach(function(done) {
    Elements.deleteMany({}, err => {
      if (err) console.warn(err);

      done();
    });
  });

  it('POST/elements Create element', done => {
    chai
      .request(app)
      .post('/elements')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('symbol');
        res.body.should.have.property('atomicWeight');
        res.body.should.have.property('atomicNumber');
        done();
      });
  });

  it('GET/elements Get element list', function(done) {
    Elements.create(element, () => {
      chai
        .request(app)
        .get('/elements')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('symbol');
          res.body[0].should.have.property('atomicNumber').eql(element.atomicNumber);
          res.body[0].should.have.property('atomicWeight').eql(element.atomicWeight);
          done();
        });
    });
  });

  it('GET/elements Get element list with params', function(done) {
    Elements.create(element, () => {
      chai
        .request(app)
        .get(`/elements?atomicNumber=${element.atomicNumber}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('symbol');
          res.body[0].should.have.property('atomicNumber').eql(element.atomicNumber);
          res.body[0].should.have.property('atomicWeight').eql(element.atomicWeight);
          done();
        });
    });
  });

  it('GET/elements/:id Get element by id', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('symbol');
          res.body.should.have.property('atomicNumber').eql(element.atomicNumber);
          res.body.should.have.property('atomicWeight').eql(element.atomicWeight);
          done();
        });
    });
  });

  it('PUT/elements/:id Update element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .put(`/elements/${data._id}`)
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

  it('GET/elements/:atomicNumber Get element by atomicNumber', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/elements/${element.atomicNumber}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('symbol');
          res.body[0].should.have.property('atomicNumber').eql(element.atomicNumber);
          res.body[0].should.have.property('atomicWeight').eql(element.atomicWeight);
          done();
        });
    });
  });
  it('DELETE/elements/:id Delete element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .delete(`/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(`${data._id}`);
          done();
        });
    });
  });
});
