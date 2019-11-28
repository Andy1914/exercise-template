import * as routes from "./handlers/handlers";
import * as response from "./lib/http-responses";
import * as server from './core/server';

const port = process.env.PORT || 5000;

let handlers = {};

Object.keys(routes).forEach(key => {
    let item = {};
    routes[key].paths.forEach(path => {
        handlers[path] = routes[key].handler;
    });
    return item;
});
export const echo = function (context, req) {
  context.log(req);
  let resourcePath = req.params.action;
  if (resourcePath in handlers) {
      handlers[resourcePath](req, context, responseCallback);
  } else {
      responseCallback(response.ERROR_404);
  }

  function responseCallback(response) {
      context.done(null, { body: JSON.stringify(response), status: response.code });
  }
};

server.init(port);
