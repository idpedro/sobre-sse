


const noop = () => {};
/**
 * @typedef {Object} EventHandlers
 * @property {(data: string) => void} onmessage - The function to call when a message is received.
 * @property {(error: Event) => void} onerror - The function to call when an error occurs.
 * @property {() => void} onopen - The function to call when the connection is opened.
 */



/**
 * The default event handlers.
 * @type {EventHandlers}
 */
const defaultEventHandlers = {
    onmessage: noop,
    onerror: noop,
    onopen: noop,
};



/**
 * Creates an EventSource instance.
 * @param {string} endpoint - The endpoint to connect to.
 * @param {EventHandlers} eventHandlers - The event handlers.
 */
function createEventSource(endpoint, eventHandlers = defaultEventHandlers) {
    const eventSource = new EventSource(endpoint);
    eventSource.addEventListener('message', eventHandlers.onmessage);
    eventSource.addEventListener('error', eventHandlers.onerror);
    eventSource.addEventListener('open', eventHandlers.onopen);
    return eventSource;
}

export { createEventSource };