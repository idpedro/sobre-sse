import { createEventSource } from './sse-client.mjs';
import { link_ui_buttons, write_to_messages, clear_messages } from './ui_elements.mjs';


/**
 * Creates a SSE client.
 * @returns {EventSource} - The SSE client.
 */
function createSSEClient() {
    return createEventSource('http://localhost:3000/sse', {
        onmessage: (message) => {
            /**
             * @type {Object}
             * @property {string} id - The id of the message.
             * @property {string} message - The message.
             */
            const json = JSON.parse(message.data);
            write_to_messages(`<p class="message"><span class="message-id">${json.id}</span><span class="message-content">${json.message}</span></p>`);
        },
        onerror: (error) => {
            write_to_messages(`<p class="message error">Erro on server connection</p>`);
        },
        onopen: () => {
            write_to_messages('<p class="message success">Successfully connected to the server</p>');
        }
       });
    return sseClient;
}

document.addEventListener('DOMContentLoaded', () => {

    /**
     * The SSE client.
     * @type {EventSource | null}
     */
   let sseClient = null

    link_ui_buttons({
        connect: () => {
            if (sseClient) {
                write_to_messages('<p class="message error">Already connected to the server</p>');
                return;
            }
            try {
                sseClient = createSSEClient();
                clear_messages();
                write_to_messages('<p>Connected to the server</p>');
            } catch (error) {
                write_to_messages(`<p class="message error">Error creating SSE client: ${error.message}</p>`);
            }
        },
        disconnect: () => {
            if (!sseClient) {
                return;
            }
            sseClient.close();
            sseClient = null;
            write_to_messages('<p>Disconnected from the server</p>');
        },
        clear: () => {
            clear_messages();
            write_to_messages('<p>Messages cleared</p>');
        },
    });
});