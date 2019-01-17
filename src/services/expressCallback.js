export default {
  read: function(req, res, next) {
    res.status(200).send(res.data)
  },
  create: function(req, res, next) {
    res.status(200).send(res.data)
  }
}
