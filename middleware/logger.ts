import { IncomingMessage, ServerResponse } from "http";

export const logger = {
  get: (target: any, prop: PropertyKey, receiver?: any) => {
    const f = Reflect.get(target, prop, receiver);
    return new Proxy(f, withLogger);
  },
};

const withLogger = {
  apply: (target: (req: IncomingMessage, res: ServerResponse) => void, thisArg: object, [req, res]: [IncomingMessage, ServerResponse]) => {
    console.log(`${new Date().toISOString()}: ${req.url!} begin`);
    const result = target(req, res);
    console.log(`${new Date().toISOString()}: ${req.url!} end`);
    return result;
  },
}