import { IncomingMessage, ServerResponse } from "http";

export const errorHandler = {
  get: (target: any, prop: PropertyKey, receiver?: any) => {
    const f = Reflect.get(target, prop, receiver);
    return new Proxy(f, withErrorHandler);
  },
};

const withErrorHandler = {
  apply: (target: (req: IncomingMessage, res: ServerResponse) => void, thisArg: object, [req, res]: [IncomingMessage, ServerResponse]) => {
    try {
      const result = target(req, res);
      return result;
    } catch (e) {
      console.error(`${new Date().toISOString()}: ${req.url!} error occurred: ${e}`);
      res.statusCode = 500;
      res.end(`処理中にエラーが発生しました: ${e}`);
    }
  },
}