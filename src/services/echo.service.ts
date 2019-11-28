import * as express from 'express';

export class EchoService {

  router;

  constructor() {
    this.router = express.Router();
    this.mountAllRoutes();
    return this.router;
  }

  mountAllRoutes() {
      this.test();
      this.returnParams();
  }

  test() {
      this.router.get('/test', (req, res, next) => {
          return res.json({
              hello: 'world'
          })
      })
  }

  returnParams() {
      this.router.get('/', (req, res, next) => {
          let query = req.query;
          return res.json(req.query)
      })
  }

}
