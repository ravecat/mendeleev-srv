export default function(req, res, next) {
  res.status(200).send(res.data);
}
