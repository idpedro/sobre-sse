import { SSEService } from "../sse/sse.service.ts";

let loopActive = false;
let timer: NodeJS.Timeout | null = null;
let stopLoop: () => void = () => {};
let message = "Hello, world!";

function getRandomDelay(delay: number[]) {
  return delay[Math.floor(Math.random() * delay.length)];
}
const delay = [500, 1000, 1500, 2000];

function createInfiniteRandomEvents(sendMessage: (message: string) => void) {
  timer = setTimeout(() => {
    sendMessage(message);
    console.log(`[${message}] Sending message: ${message}`);
    createInfiniteRandomEvents(sendMessage);
  }, getRandomDelay(delay));

  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      loopActive = false;
      stopLoop = () => {};
    }
  };
}

export function startLoopCommand() {
  const sseService = SSEService.getInstance();
  if (loopActive) {
    console.log("Loop is already active");
    return;
  }
  console.log("Starting loop...");
  loopActive = true;
  stopLoop = createInfiniteRandomEvents(
    sseService.sendMessageToAllConnections.bind(sseService),
  );
}

export function stopLoopCommand() {
  if (!loopActive) {
    console.log("Loop is not active");
    return;
  }
  loopActive = false;
  stopLoop();
}

export function setLoopMessage(message: string) {
  message = message;
}
