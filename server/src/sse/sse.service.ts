import { ServerResponse } from "node:http";
import { sendMessageToRequest } from "../utils/response.ts";

export type SSEConnection = {
  id: string;
  response: ServerResponse;
};
export class SSEService {
  private connections: Map<SSEConnection["id"], SSEConnection> = new Map();
  static instance: SSEService;

  static getInstance() {
    if (SSEService.instance) {
      return SSEService.instance;
    }
    SSEService.instance = new SSEService();
    return SSEService.instance;
  }

  addConnection(connection: SSEConnection) {
    this.connections.set(connection.id, connection);
    console.log(`[${connection.id}] Connection added`);
    this.sendMessageToConnection(connection.id, `Welcome to the server!`);
  }

  removeConnection(id: SSEConnection["id"]) {
    this.connections.delete(id);
  }

  getConnection(id: SSEConnection["id"]) {
    return this.connections.get(id);
  }

  sendMessageToConnection(id: SSEConnection["id"], message: string) {
    const connection = this.getConnection(id);
    if (connection) {
      sendMessageToRequest(connection.response, message);
    }
  }

  sendMessageToAllConnections(message: string) {
    console.log(
      `[${this.connections.size}] Sending message to all connections: ${message}`,
    );
    for (const connection of this.connections.values()) {
      sendMessageToRequest(connection.response, message);
    }
  }

  stopEvent(id: SSEConnection["id"]) {
    const connection = this.getConnection(id);
    if (connection) {
      connection.response.end();
    }
  }

  getStatus(id: SSEConnection["id"]) {
    const connection = this.getConnection(id);
    if (connection) {
      return connection.response.statusCode;
    }
    return 0;
  }
  hasConnection(id: SSEConnection["id"]) {
    return this.connections.has(id);
  }

  getConnectionsSize() {
    return this.connections.size;
  }
  getConnections() {
    return Array.from(this.connections.keys());
  }
}
