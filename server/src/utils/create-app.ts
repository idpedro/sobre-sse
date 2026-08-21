import { createServer, IncomingMessage, ServerResponse } from "node:http";
import type { RouteId } from "../types.ts";
import type { Route } from "./route.ts";

const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "text/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, QUERY",
};

function getKeyFromRequest(req: IncomingMessage) {
  return `${req.method}:${req.url}` as RouteId;
}

function createNotFoundResponse(res: ServerResponse) {
  res.writeHead(404, {
    "Content-Type": "text/json",
  });
  res.end(JSON.stringify({ error: "Not found" }));
}

class App {
  private server: ReturnType<typeof createServer>;
  private headers: Record<string, string> = DEFAULT_HEADERS;
  private routes: Map<RouteId, Route> = new Map();
  constructor() {
    this.server = createServer();
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse) {
    const key = getKeyFromRequest(req);
    const route = this.routes.get(key);
    console.log(key, route?.getId());

    if (!route) {
      createNotFoundResponse(res);
      return;
    }
    // res.writeHead(200, this.headers); // TODO: Uncomment this when we have a way to set the headers
    route.handle(req, res);
  }
  setHeaders(headers: Record<string, string>) {
    this.headers = { ...DEFAULT_HEADERS, ...headers };
  }
  listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    this.server.on("request", this.handleRequest.bind(this));
  }
  registerRoute(route: Route) {
    console.log(route.getId());
    this.routes.set(route.getId(), route);
  }
  close() {
    this.server.close();
  }
}

export function createApp() {
  const server = new App();
  return server;
}

export { type App };
