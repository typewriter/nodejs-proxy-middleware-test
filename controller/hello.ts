import { IncomingMessage, ServerResponse } from "http";

export class Hello {
  hello = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url!.includes("error")) {
      throw "エラーです！！";
    }

    res.end('Hello world!');
  }
}