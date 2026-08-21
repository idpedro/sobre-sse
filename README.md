# about-sse

## Description
 
 This a study project about everything related to Server-Sent Events (SSE) using raw Node.js.


# Stack
- [Node.js v24.x](https://nodejs.org) - The runtime.
- [PNPM](https://pnpm.io) - The package manager.

# Structure

- [server](server/src/main.ts) - The server.
- [client](client/src/index.html) - The client.

# Whats is SSE? 

SSE is a technology that allows a server to send data to a client over a single HTTP connection ussing media type `text/event-stream`.

| ⚠️  Important |
|------|
|SSE is not a protocol, it is a Community-Driven Specification for Server-Sent Events over HTTP/1.1 or superior|
| Is Unidirectional, the server can only send data to the client, the client cannot send data to the server|


Advantages:
- Simple to implement
- Lightweight
- Small overhead
- Real-time communication
- Automatic reconnection
- Low latency


Disadvantages:
- Limited to text data
- Limited to one-way communication


# Whe this is useful?

- LLM chats (uses a lot of SSE)
- Notifications (for a async tasks like a background job)
- Updates (like a news feed)


# How to run the server

```bash
pnpm dev:server
```
yep, you dont need to install anything, just run the command and the server will start, this project just use node.js 24 and pnpm to manage the dependencies.

# How to run the client

Just open the index.html file in the browser


## Commands 

After you run the server, you can use the following commands to interact with the server:


- `/help` - Shows the available commands
- `/list` - Lists all connections
- `/send` - Sends a message to all connections
- `/send-to <connection-id>` - Sends a message to a specific connection
- `/loop` - Starts the loop (this will start a loop that will send a message to all connections every 500ms, 1000ms, 1500ms or 2000ms)
- `/loop stop` - Stops the loop (this will stop the loop)
- `/loop message <message>` - Sets the message for the loop (this will set the message for the loop)