const mapMongo = { create:'create', read:'find', update:'findByIdAndUpdate', delete:'findByIdAndRemove' };

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
  }
};
