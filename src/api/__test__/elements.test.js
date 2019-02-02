import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import app from '../../app';
import { Elements } from '../../models';

chai.use(chaiHttp);
chai.should();

describe('API/api/elements', function () {
  before(function (done) {
    const { databaseName, databaseHost, databasePort } = config;

    mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, { useNewUrlParser: true });

    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function() {
      console.warn('\nConnection to mongo successfully established\n');
    });

    done();
  });

  beforeEach(function (done) {
    Elements.deleteMany({}, err => { 
      done();           
    });   
  });

  it('GET/api/elements Get element list', function (done) {
    chai.request(app)
      .get('/api/elements')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('POST/api/elements Create element successfully', (done) => {
    const element = {
      name: 'Hydrogen',
      symbol: 'H',
      atomic_weigth: 1,
      atomic_number: 1
    };

    chai.request(app)
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

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
