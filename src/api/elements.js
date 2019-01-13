import { Router } from 'express';
import models from '../models';
import resources from '../services/resources'

export default ({ Elements }) => resources({
  model: Elements,
  read(req, res, next) {
    res.send(res.data)
  }
})