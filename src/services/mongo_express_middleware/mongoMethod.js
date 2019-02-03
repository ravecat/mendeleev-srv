const mapMongo = { create:'create', read:'find', readEntity:'findOne', update:'findOneAndUpdate', delete:'findByIdAndRemove' };

export default {
  read: function({ req, res, next, callback, model, key }) {
    return model[mapMongo[key]](function(err, data) {
      if (err) return res.status(500).send(err);
      
      res.data = data;

      callback(req, res, next);
    });
  },
  create: function({ req, res, next, callback, model, key }) {
    return model[mapMongo[key]](req.body, function(err, data) {
      if (err) return res.status(500).send(err);
      
      res.data = data;

      callback(req, res, next);
    });
  },
  readEntity: function({ req, res, next, callback, model, key }) {
    return model[mapMongo[key]]({ _id: req.params.id }, function(err, data) {
      if (err) return res.status(500).send(err);
      
      res.data = data;

      callback(req, res, next);
    });
  },
  update: function({ req, res, next, callback, model, key }) {
    return model[mapMongo[key]]({ _id: req.params.id }, req.body, { new: true }, function(err, data) {
      if (err) return res.status(500).send(err);

      res.data = data;

      callback(req, res, next);
    });
  }
};
