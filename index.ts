import http, { IncomingMessage, ServerResponse } from 'http';
import { Hello } from './controller/hello';
import { errorHandler } from './middleware/error_handler';
import { logger } from './middleware/logger';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const hello = new Hello();
  const proxy = new Proxy(new Proxy(hello, logger), errorHandler);

  proxy.hello(req, res);
});

console.log('Listen http://localhost:3000/');
server.listen(3000);
