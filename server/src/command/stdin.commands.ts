import { stdin } from "node:process";
import { SSEService } from "../sse/sse.service.ts";
import type { App } from "../utils/create-app.ts";
import {
  setLoopMessage,
  startLoopCommand,
  stopLoopCommand,
} from "./loop.command.ts";

let logMessages = false;
const sseService = SSEService.getInstance();
function startStdinCommands(app: App) {
  const commands: Record<string, (...args: any[]) => void> = {
    "/shutdown": () => {
      console.log("Shutting down server...");
      sseService.sendMessageToAllConnections("Bye, bye!");
      app.close();
      process.exit(0);
    },
    "/help": () => {
      console.log("Available commands:");
      console.log("/shutdown - Shuts down the server");
      console.log("/list - Lists all connections");
      console.log("/help - Shows this help");
      console.log("/send - Sends a message to all connections");
      console.log("/send-to - Sends a message to a specific connection");
      console.log("/log-messages - Enables/disables logging messages");
      console.log("/loop - Starts the loop");
      console.log("/loop stop - Stops the loop");
      console.log("/loop message <message> - Sets the message for the loop");
    },
    "/list": () => {
      console.log("Connections:");
      sseService.getConnections().forEach((id) => {
        console.log(
          `[${id}] ${sseService.getConnection(id)?.response.statusCode}`,
        );
      });
      console.log(`Total connections: ${sseService.getConnectionsSize()}\n`);
    },
    "/send": (...messages: string[]) => {
      if (sseService.getConnectionsSize() === 0) {
        console.log(
          "No connections to send message to, use /list to see connections\n",
        );
        return;
      }
      if (!messages.length) {
        console.log("Usage: /send <message>\n");
        console.log("Example: /send Hello, world!");
        return;
      }
      console.log(
        `Sending message to all connections: ${messages.join(" ")}\n`,
      );
      sseService.sendMessageToAllConnections(messages.join(" "));
    },
    "/send-to": (id: string, ...messages: string[]) => {
      if (sseService.getConnectionsSize() === 0) {
        console.log(
          "No connections to send message to, use /list to see connections\n",
        );
        return;
      }
      if (!messages.length) {
        console.log("Usage: /send-to <id> <message>\n");
        console.log("Example: /send-to <id> Hello, world! Hello, world!\n");
        return;
      }
      if (!sseService.hasConnection(id)) {
        console.log(`Connection ${id} not found\n`);
        return;
      }
      sseService.sendMessageToConnection(id, messages.join(" "));
    },
    "/loop": (...args: string[]) => {
      const [command, ...rest] = args;
      if (command === undefined) {
        console.log("Usage: /loop <start/stop/message> <message>\n");
        console.log("Example: /loop start\n");
        console.log("Example: /loop stop\n");
        console.log("Example: /loop message Hello, world!\n");
        return;
      }
      if (command === "start") {
        startLoopCommand();
      } else if (command === "stop") {
        stopLoopCommand();
      } else if (command === "message") {
        setLoopMessage(rest.join(" "));
      }
    },
  };

  stdin.on("data", (data: Buffer) => {
    if (data.toString().trim().startsWith("/")) {
      const command = data.toString().trim().split(" ")[0];
      const args = data.toString().trim().split(" ").slice(1);
      const fnCommand = commands[command as keyof typeof commands];
      if (fnCommand) {
        fnCommand(...args);
      } else {
        console.log("Invalid command, use /help to see available commands");
      }
    } else {
      console.log("use /help to see available commands");
    }
  });
  return commands;
}

export { startStdinCommands };
