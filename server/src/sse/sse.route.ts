import { route } from "../utils/route.ts";
import { SSEController } from "./sse.controler.ts";

export const sseRoute = route("GET", "/sse", (req, res) => {
  SSEController.getInstance().handle(req, res);
});
