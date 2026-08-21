import { startStdinCommands } from "./command/stdin.commands.ts";
import { sseRoute } from "./sse/sse.route.ts";
import { createApp } from "./utils/create-app.ts";

const PORT = 3000;
const CORs = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, QUERY",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const app = createApp();
app.registerRoute(sseRoute);
app.setHeaders(CORs);
app.listen(PORT);
startStdinCommands(app);
