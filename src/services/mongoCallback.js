export default {
  read: function(req, res, next, fn) {
    return function(err, data) {
      if (err) return res.status(500).send(err)
      
      res.data = data

      fn(req, res, next)
    }
  },
  create: function(req, res, next, fn) {
    return function(err, data) {
      if (err) return res.status(500).send(err)
      
      res.data = data

      fn(req, res, next)
    }
  }
}
