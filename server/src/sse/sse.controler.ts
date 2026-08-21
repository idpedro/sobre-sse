import { IncomingMessage, ServerResponse } from "node:http";
import { SSEService } from "./sse.service.ts";
import { generateId } from "../utils/id.ts";

function setSSEHeaders(res: ServerResponse) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    connection: "keep-alive",
  });
}

const CONNECTION_ID_PROPERTY = Symbol("CONNECTION_ID");
function getConnectionId(res: ServerResponse) {
  return Reflect.get(res, CONNECTION_ID_PROPERTY);
}

function setConnectionId(res: ServerResponse) {
  Reflect.defineProperty(res, CONNECTION_ID_PROPERTY, {
    value: generateId(),
  });
}

export class SSEController {
  static instance: SSEController;
  private sseService: SSEService;

  static getInstance() {
    if (SSEController.instance) {
      return SSEController.instance;
    }
    SSEController.instance = new SSEController(SSEService.getInstance());
    return SSEController.instance;
  }

  constructor(sseService: SSEService) {
    this.sseService = sseService;
  }

  handle(_: IncomingMessage, res: ServerResponse) {
    if (getConnectionId(res) !== undefined) {
      return;
    }
    setSSEHeaders(res);
    setConnectionId(res);
    this.sseService.addConnection({
      id: getConnectionId(res),
      response: res,
    });
    res.on("close", () => {
      this.sseService.removeConnection(getConnectionId(res));
    });
  }
}
