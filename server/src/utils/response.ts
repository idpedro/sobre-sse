import { ServerResponse } from "node:http";
import { generateId } from "./id.ts";

function createNewMessage(message: string) {
  return JSON.stringify(createNewMessageEvent(message));
}

function createNewMessageEvent(message: string) {
  return {
    id: generateId(),
    message,
  };
}

function sendMessageToRequest(connection: ServerResponse, message: string) {
  if (connection && !connection.closed) {
    connection.write(`data: ${createNewMessage(message)}\n\n`);
  }
}

export { sendMessageToRequest };
