import { IncomingMessage, ServerResponse } from "node:http";
import type { Method, RouteId, RoutePath } from "../types.ts";

class Route {
  private method: Method;
  private path: RoutePath;
  private handler: (req: IncomingMessage, res: ServerResponse) => void;
  constructor(
    method: Method,
    path: RoutePath,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
  ) {
    this.method = method;
    this.path = path;
    this.handler = handler;
  }
  getId(): RouteId {
    return `${this.method}:${this.path}`;
  }
  handle(req: IncomingMessage, res: ServerResponse) {
    this.handler(req, res);
  }
}

function route(
  method: Method,
  path: RoutePath,
  handler: (req: IncomingMessage, res: ServerResponse) => void,
) {
  return new Route(method, path, handler);
}

export { type Route, route };
