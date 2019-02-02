import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('API/api', function () {
  before(function (done) {
    const { databaseName, databaseHost, databasePort } = config;

    mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, { useNewUrlParser: true });

    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function() {
      console.warn('\nConnection to mongo successfully established\n');
    });

    done();
  });

  it('GET/ Root path', function (done) {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('Non-existing path', function (done) {
    chai.request(app)
      .get('/path_not_exist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
